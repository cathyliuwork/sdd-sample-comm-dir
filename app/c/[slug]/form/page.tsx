'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { generateShareText } from '@/lib/utils/shareText';

export default function MemberFormPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [loading, setLoading] = useState(false);
  const [communityName, setCommunityName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    profession: '',
    currentWork: '',
    shareTopics: '',
    seekTopics: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchCommunityInfo();
  }, []);

  const fetchCommunityInfo = async () => {
    try {
      const response = await fetch(`/api/community/${slug}`);
      const data = await response.json();

      if (data.success) {
        setCommunityName(data.data.community.name);
      }
    } catch (error) {
      console.error('Failed to fetch community info:', error);
    }
  };

  const handleCopy = async (text: string, isLink: boolean = false) => {
    try {
      await navigator.clipboard.writeText(text);
      if (isLink) {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      } else {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('复制失败，请手动复制');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(`/api/community/${slug}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.details) {
          const newErrors: Record<string, string> = {};
          data.details.forEach((err: any) => {
            newErrors[err.path[0]] = err.message;
          });
          setErrors(newErrors);
        } else {
          alert(data.error || '提交失败');
        }
        return;
      }

      setResult(data.data);
      setSubmitted(true);
    } catch (error) {
      console.error('Submit error:', error);
      alert('提交失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  if (submitted && result) {
    const shareText = generateShareText(formData);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">提交成功！</h2>
            <p className="text-gray-600">您的信息已成功提交</p>
          </div>

          {/* 分享内容预览 */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">以下是您提交的信息，请复制并发送到社区群聊中</h3>
            <div className="bg-gray-50 rounded-lg p-6 mb-4">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans">
                {shareText}
              </pre>
            </div>
            <Button
              onClick={() => handleCopy(shareText, false)}
              className="w-full"
              size="lg"
            >
              {copied ? '✓ 已复制' : '复制到剪贴板'}
            </Button>
          </div>

          {/* 分享链接展示区域 */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">分享链接（可长期访问）</h3>
            <div className="bg-gray-50 rounded-lg px-6 py-3">
              <div className="flex items-center gap-3">
                <p className="flex-1 text-sm text-gray-800 break-all select-all">{result.shareUrl}</p>
                <button
                  onClick={() => handleCopy(result.shareUrl, true)}
                  className="flex-shrink-0 p-2 hover:bg-gray-200 rounded transition-colors"
                  title={linkCopied ? '已复制' : '复制链接'}
                >
                  {linkCopied ? (
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* 查看成员列表链接 */}
          <div className="text-center mt-6">
            <a
              href={`/c/${slug}/list`}
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              查看社区成员列表 →
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {communityName ? `${communityName} - 成员信息收集` : '成员信息收集'}
            </h1>
            <p className="text-gray-600">
              请填写您的信息并分享给社区
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 必填字段 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                基本信息 <span className="text-red-500 text-sm">*必填</span>
              </h3>

              <Input
                label="名字"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="请输入您的名字"
                error={errors.name}
                required
              />

              <Input
                label="常住地"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="例如：北京、上海、美国纽约"
                error={errors.location}
                required
              />

              <Input
                label="职业/行业"
                value={formData.profession}
                onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                placeholder="例如：产品经理、软件工程师"
                error={errors.profession}
                required
              />
            </div>

            {/* 选填字段 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                更多信息 <span className="text-gray-500 text-sm">选填</span>
              </h3>

              <Textarea
                label="正在做的事情"
                value={formData.currentWork}
                onChange={(e) => setFormData({ ...formData, currentWork: e.target.value })}
                placeholder="简单介绍一下您目前在做什么"
                rows={3}
                error={errors.currentWork}
              />

              <Textarea
                label="希望分享的内容"
                value={formData.shareTopics}
                onChange={(e) => setFormData({ ...formData, shareTopics: e.target.value })}
                placeholder="您可以分享什么内容或经验"
                rows={3}
                error={errors.shareTopics}
              />

              <Textarea
                label="希望收获的内容"
                value={formData.seekTopics}
                onChange={(e) => setFormData({ ...formData, seekTopics: e.target.value })}
                placeholder="您希望从社区获得什么帮助"
                rows={3}
                error={errors.seekTopics}
              />
            </div>

            {/* 免责声明 */}
            <p className="text-sm text-gray-500 text-center mb-4">
              提交即表示您同意公开您填写的信息
            </p>

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? '提交中...' : '提交信息'}
            </Button>
          </form>
        </div>

        {/* 查看成员列表链接 */}
        <div className="mt-6 text-center">
          <a
            href={`/c/${slug}/list`}
            className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
          >
            查看社区成员信息 →
          </a>
        </div>
      </div>
    </div>
  );
}
