'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { generateShareText } from '@/lib/utils/shareText';
import Button from '@/components/ui/Button';

export default function SharePage() {
  const params = useParams();
  const slug = params.slug as string;
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState<any>(null);
  const [communityName, setCommunityName] = useState('');
  const [shareText, setShareText] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchMember();
  }, []);

  const fetchMember = async () => {
    try {
      const response = await fetch(`/api/community/${slug}/members/${id}`);
      const data = await response.json();

      if (data.success) {
        setMember(data.data.member);
        setCommunityName(data.data.communityName);
        setShareText(generateShareText(data.data.member));
      } else {
        alert(data.error || '加载失败');
      }
    } catch (error) {
      console.error('Failed to fetch member:', error);
      alert('加载失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('复制失败，请手动复制');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-gray-600">加载中...</div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-gray-600">未找到成员信息</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              会员分享内容
            </h1>
            <p className="text-gray-600">{communityName}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans">
              {shareText}
            </pre>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleCopy}
              className="w-full"
              size="lg"
            >
              {copied ? '✓ 已复制' : '复制到剪贴板'}
            </Button>

            <a
              href={`/c/${slug}/list`}
              className="block w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition-colors text-center"
            >
              查看成员列表
            </a>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>复制后可直接分享到社群</p>
          </div>
        </div>
      </div>
    </div>
  );
}
