interface Member {
  name: string;
  location: string;
  profession: string;
  currentWork?: string | null;
  shareTopics?: string | null;
  seekTopics?: string | null;
}

/**
 * 生成适合微信分享的格式化文本
 */
export function generateShareText(member: Member): string {
  let text = `【名字】${member.name}\n`;
  text += `【常住地】${member.location}\n`;
  text += `【职业/行业】${member.profession}\n`;

  if (member.currentWork) {
    text += `\n【正在做的事情】\n${member.currentWork}\n`;
  }

  if (member.shareTopics) {
    text += `\n【希望分享的内容】\n${member.shareTopics}\n`;
  }

  if (member.seekTopics) {
    text += `\n【希望收获的内容】\n${member.seekTopics}\n`;
  }

  return text;
}
