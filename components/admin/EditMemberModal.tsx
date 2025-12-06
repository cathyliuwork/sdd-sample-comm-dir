'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

interface Member {
  id: string;
  name: string;
  location: string;
  profession: string;
  currentWork: string | null;
  shareTopics: string | null;
  seekTopics: string | null;
  community: {
    id: string;
    name: string;
    slug: string;
  };
}

interface EditMemberModalProps {
  member: Member;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditMemberModal({
  member,
  isOpen,
  onClose,
  onSuccess,
}: EditMemberModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: member.name,
    location: member.location,
    profession: member.profession,
    currentWork: member.currentWork || '',
    shareTopics: member.shareTopics || '',
    seekTopics: member.seekTopics || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(`/api/admin/members/${member.id}`, {
        method: 'PATCH',
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
          alert(data.error || '更新失败');
        }
        return;
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to update member:', error);
      alert('更新失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="编辑成员信息">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="姓名"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="请输入姓名"
          error={errors.name}
          required
        />

        <Input
          label="所在地"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="例如：北京、上海"
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

        <Textarea
          label="正在做的事情"
          value={formData.currentWork}
          onChange={(e) => setFormData({ ...formData, currentWork: e.target.value })}
          placeholder="简单介绍一下目前在做什么"
          rows={3}
          error={errors.currentWork}
        />

        <Textarea
          label="希望分享的内容"
          value={formData.shareTopics}
          onChange={(e) => setFormData({ ...formData, shareTopics: e.target.value })}
          placeholder="可以分享什么内容或经验"
          rows={3}
          error={errors.shareTopics}
        />

        <Textarea
          label="希望收获的内容"
          value={formData.seekTopics}
          onChange={(e) => setFormData({ ...formData, seekTopics: e.target.value })}
          placeholder="希望从社区获得什么帮助"
          rows={3}
          error={errors.seekTopics}
        />

        <div className="flex gap-3 pt-4">
          <Button type="button" onClick={onClose} className="flex-1 bg-gray-500 hover:bg-gray-600">
            取消
          </Button>
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? '保存中...' : '保存'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
