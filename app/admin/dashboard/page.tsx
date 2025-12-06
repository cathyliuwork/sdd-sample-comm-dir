'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LogoutButton from '@/components/admin/LogoutButton';
import StatsCard from '@/components/admin/StatsCard';

interface Stats {
  totalCommunities: number;
  totalMembers: number;
  todayMembers: number;
  recentMembers: Array<{
    id: string;
    name: string;
    location: string;
    profession: string;
    createdAt: string;
    community: {
      name: string;
      slug: string;
    };
  }>;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();

      if (!response.ok || !data.success) {
        if (response.status === 401) {
          router.push('/admin/login');
          return;
        }
        throw new Error(data.error || '加载失败');
      }

      setStats(data.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      alert('加载统计数据失败');
    } finally {
      setLoading(false);
    }
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
            <h1 className="text-3xl font-bold text-gray-900">管理员仪表盘</h1>
            <p className="text-gray-600 mt-1">欢迎回来！</p>
          </div>
          <LogoutButton />
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="总社区数"
              value={stats.totalCommunities}
              icon="🏘️"
              color="blue"
            />
            <StatsCard
              title="总成员数"
              value={stats.totalMembers}
              icon="👥"
              color="green"
            />
            <StatsCard
              title="今日新增"
              value={stats.todayMembers}
              icon="✨"
              color="purple"
            />
            <StatsCard
              title="活跃度"
              value={stats.recentMembers.length > 0 ? '活跃' : '待激活'}
              icon="📈"
              color="orange"
            />
          </div>
        )}

        {/* Recent Members */}
        {stats && stats.recentMembers.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">最近加入的成员</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">姓名</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">所在地</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">职业</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">社区</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">加入时间</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentMembers.map((member) => (
                    <tr key={member.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{member.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{member.location}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{member.profession}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{member.community.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {new Date(member.createdAt).toLocaleDateString('zh-CN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Navigation Cards */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">快捷入口</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            href="/admin/communities"
            className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">社区管理</h3>
                <p className="text-sm text-gray-600">管理社区和设置</p>
              </div>
            </div>
          </a>

          <a
            href="/admin/members"
            className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">成员管理</h3>
                <p className="text-sm text-gray-600">查看和管理所有成员</p>
              </div>
            </div>
          </a>

          <a
            href="/admin/members"
            className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">数据导出</h3>
                <p className="text-sm text-gray-600">导出成员数据为 CSV</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
