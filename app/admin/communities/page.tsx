'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Modal from '@/components/ui/Modal';
import { generateAccessCode } from '@/lib/utils/accessCode';

interface Community {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  accessCode: string | null;
  memberCount: number;
  createdAt: string;
}

export default function CommunitiesPage() {
  const router = useRouter();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCommunity, setEditingCommunity] = useState<Community | null>(null);
  const [baseUrl, setBaseUrl] = useState('');

  // 表单状态
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    accessCode: '',
  });

  useEffect(() => {
    // 设置当前域名（客户端动态获取）
    setBaseUrl(window.location.origin);
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      const response = await fetch('/api/admin/communities');
      const data = await response.json();
      if (data.success) {
        setCommunities(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch communities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/communities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setShowCreateModal(false);
        setFormData({ name: '', description: '', accessCode: '' });
        fetchCommunities();
        alert(`社区创建成功！\n\n表单链接: ${data.data.formUrl}\n列表链接: ${data.data.listUrl}`);
      }
    } catch (error) {
      console.error('Failed to create community:', error);
      alert('创建失败，请重试');
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCommunity) return;

    try {
      const response = await fetch(`/api/admin/communities/${editingCommunity.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setShowEditModal(false);
        setEditingCommunity(null);
        setFormData({ name: '', description: '', accessCode: '' });
        fetchCommunities();
      }
    } catch (error) {
      console.error('Failed to update community:', error);
      alert('更新失败，请重试');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`确定要删除社区"${name}"吗？\n\n此操作将同时删除该社区的所有成员数据，且无法恢复！`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/communities/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        fetchCommunities();
      }
    } catch (error) {
      console.error('Failed to delete community:', error);
      alert('删除失败，请重试');
    }
  };

  const openEditModal = (community: Community) => {
    setEditingCommunity(community);
    setFormData({
      name: community.name,
      description: community.description || '',
      accessCode: community.accessCode || '',
    });
    setShowEditModal(true);
  };

  const generateCode = () => {
    setFormData({ ...formData, accessCode: generateAccessCode(8) });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">社区管理</h1>
            <p className="text-gray-600 mt-1">管理所有社区及其成员数据</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => router.push('/admin/dashboard')}>
              返回仪表盘
            </Button>
            <Button onClick={() => setShowCreateModal(true)}>
              创建社区
            </Button>
          </div>
        </div>

        {/* Communities Grid */}
        {communities.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500 mb-4">还没有社区，创建第一个吧！</p>
            <Button onClick={() => setShowCreateModal(true)}>创建社区</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community) => (
              <div key={community.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{community.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">/{community.slug}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                    {community.memberCount} 成员
                  </span>
                </div>

                {community.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {community.description}
                  </p>
                )}

                {community.accessCode && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-xs text-yellow-800">
                      访问码: <span className="font-mono font-semibold">{community.accessCode}</span>
                    </p>
                  </div>
                )}

                <div className="space-y-2 mb-4">
                  <a
                    href={`${baseUrl}/c/${community.slug}/form`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-blue-600 hover:text-blue-800"
                  >
                    📝 表单链接
                  </a>
                  <a
                    href={`${baseUrl}/c/${community.slug}/list`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-blue-600 hover:text-blue-800"
                  >
                    👥 成员列表
                  </a>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => openEditModal(community)}
                    className="flex-1"
                  >
                    编辑
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(community.id, community.name)}
                    className="flex-1"
                  >
                    删除
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Modal */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => {
            setShowCreateModal(false);
            setFormData({ name: '', description: '', accessCode: '' });
          }}
          title="创建新社区"
        >
          <form onSubmit={handleCreate} className="space-y-4">
            <Input
              label="社区名称"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="例如：产品经理社区"
              required
            />

            <Textarea
              label="社区描述"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="简单描述这个社区（选填）"
              rows={3}
            />

            <div>
              <Input
                label="访问码"
                value={formData.accessCode}
                onChange={(e) => setFormData({ ...formData, accessCode: e.target.value })}
                placeholder="设置访问码以保护成员列表（选填）"
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={generateCode}
                className="mt-2"
              >
                生成随机访问码
              </Button>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setShowCreateModal(false);
                  setFormData({ name: '', description: '', accessCode: '' });
                }}
                className="flex-1"
              >
                取消
              </Button>
              <Button type="submit" className="flex-1">
                创建
              </Button>
            </div>
          </form>
        </Modal>

        {/* Edit Modal */}
        <Modal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingCommunity(null);
            setFormData({ name: '', description: '', accessCode: '' });
          }}
          title="编辑社区"
        >
          <form onSubmit={handleEdit} className="space-y-4">
            <Input
              label="社区名称"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Textarea
              label="社区描述"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />

            <div>
              <Input
                label="访问码"
                value={formData.accessCode}
                onChange={(e) => setFormData({ ...formData, accessCode: e.target.value })}
                placeholder="留空表示无访问限制"
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={generateCode}
                className="mt-2"
              >
                生成新访问码
              </Button>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setShowEditModal(false);
                  setEditingCommunity(null);
                }}
                className="flex-1"
              >
                取消
              </Button>
              <Button type="submit" className="flex-1">
                保存
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}
