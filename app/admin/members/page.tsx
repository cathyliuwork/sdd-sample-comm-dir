'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import EditMemberModal from '@/components/admin/EditMemberModal';

interface Member {
  id: string;
  name: string;
  location: string;
  profession: string;
  currentWork: string | null;
  shareTopics: string | null;
  seekTopics: string | null;
  createdAt: string;
  community: {
    id: string;
    name: string;
    slug: string;
  };
}

interface Community {
  id: string;
  name: string;
  slug: string;
}

export default function MembersManagementPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchCommunities();
    fetchMembers();
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [selectedCommunity, searchQuery]);

  const fetchCommunities = async () => {
    try {
      const response = await fetch('/api/admin/communities');
      const data = await response.json();

      if (data.success) {
        setCommunities(data.data.communities);
      }
    } catch (error) {
      console.error('Failed to fetch communities:', error);
    }
  };

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCommunity !== 'all') {
        params.append('communityId', selectedCommunity);
      }
      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const response = await fetch(`/api/admin/members?${params}`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        if (response.status === 401) {
          router.push('/admin/login');
          return;
        }
        throw new Error(data.error || '加载失败');
      }

      setMembers(data.data.members);
    } catch (error) {
      console.error('Failed to fetch members:', error);
      alert('加载成员列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`确定要删除成员"${name}"吗？此操作无法撤销。`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/members/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || '删除失败');
      }

      alert('成员已删除');
      fetchMembers();
    } catch (error) {
      console.error('Failed to delete member:', error);
      alert('删除失败，请重试');
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const response = await fetch('/api/admin/members/export');

      if (!response.ok) {
        throw new Error('导出失败');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `members-${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to export:', error);
      alert('导出失败，请重试');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">成员管理</h1>
            <p className="text-gray-600 mt-1">共 {members.length} 位成员</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleExport}
              disabled={exporting || members.length === 0}
              className="bg-green-600 hover:bg-green-700"
            >
              {exporting ? '导出中...' : '导出 CSV'}
            </Button>
            <a
              href="/admin/dashboard"
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              返回仪表盘
            </a>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                筛选社区
              </label>
              <select
                value={selectedCommunity}
                onChange={(e) => setSelectedCommunity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">全部社区</option>
                {communities && communities.map((community) => (
                  <option key={community.id} value={community.id}>
                    {community.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                搜索成员
              </label>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索姓名、地点或职业"
              />
            </div>
          </div>
        </div>

        {/* Members Table */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <p className="text-gray-600">加载中...</p>
          </div>
        ) : members.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg">没有找到成员</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      姓名
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      所在地
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      职业
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      社区
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      加入时间
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.id} className="border-t hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {member.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {member.location}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {member.profession}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {member.community.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {new Date(member.createdAt).toLocaleDateString('zh-CN')}
                      </td>
                      <td className="py-3 px-4 text-sm text-right">
                        <button
                          onClick={() => setEditingMember(member)}
                          className="text-blue-600 hover:text-blue-700 font-medium mr-3"
                        >
                          编辑
                        </button>
                        <button
                          onClick={() => handleDelete(member.id, member.name)}
                          className="text-red-600 hover:text-red-700 font-medium"
                        >
                          删除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingMember && (
        <EditMemberModal
          member={editingMember}
          isOpen={!!editingMember}
          onClose={() => setEditingMember(null)}
          onSuccess={() => {
            fetchMembers();
            setEditingMember(null);
          }}
        />
      )}
    </div>
  );
}
