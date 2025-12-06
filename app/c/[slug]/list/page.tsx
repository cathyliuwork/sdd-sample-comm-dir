'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface Member {
  id: string;
  name: string;
  location: string;
  profession: string;
  currentWork: string | null;
  shareTopics: string | null;
  seekTopics: string | null;
  createdAt: string;
}

export default function MemberListPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>([]);
  const [communityName, setCommunityName] = useState('');
  const [requiresAccessCode, setRequiresAccessCode] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [accessError, setAccessError] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async (code?: string) => {
    setLoading(true);
    setAccessError('');

    try {
      const url = code
        ? `/api/community/${slug}/members?accessCode=${encodeURIComponent(code)}`
        : `/api/community/${slug}/members`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setMembers(data.data.members);
        setCommunityName(data.data.communityName);
        setRequiresAccessCode(false);
      } else if (data.requiresAccessCode) {
        setRequiresAccessCode(true);
        setAccessError(code ? '访问码错误，请重试' : '');
      } else {
        alert(data.error || '加载失败');
      }
    } catch (error) {
      console.error('Failed to fetch members:', error);
      alert('加载失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleAccessCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode.trim()) {
      fetchMembers(accessCode.trim());
    }
  };

  if (requiresAccessCode && members.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">需要访问码</h2>
            <p className="text-gray-600">此社区的成员列表需要访问码才能查看</p>
          </div>

          {accessError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{accessError}</p>
            </div>
          )}

          <form onSubmit={handleAccessCodeSubmit} className="space-y-4">
            <Input
              label="访问码"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder="请输入访问码"
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? '验证中...' : '确认'}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  if (loading && members.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-gray-600">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {communityName} - 成员列表
          </h1>
          <p className="text-gray-600">共 {members.length} 位成员</p>
        </div>

        {members.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">还没有成员，快来填写表单吧！</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="border-b pb-4 mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>📍 {member.location}</p>
                    <p>💼 {member.profession}</p>
                  </div>
                </div>

                {member.currentWork && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">正在做的事情</h4>
                    <p className="text-sm text-gray-600">{member.currentWork}</p>
                  </div>
                )}

                {member.shareTopics && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">希望分享</h4>
                    <p className="text-sm text-gray-600">{member.shareTopics}</p>
                  </div>
                )}

                {member.seekTopics && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">希望收获</h4>
                    <p className="text-sm text-gray-600">{member.seekTopics}</p>
                  </div>
                )}

                <p className="text-xs text-gray-400 mt-4 pt-4 border-t">
                  {new Date(member.createdAt).toLocaleDateString('zh-CN')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
