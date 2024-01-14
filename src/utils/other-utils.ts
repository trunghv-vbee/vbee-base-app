export const checkPhoneNumberVietnamese = /^(\+?84|0|\(\+?84\))[1-9]\d{8,9}$/g;

export const htmltoText = (html: string) => {
  let text = html;
  text = text.replace(/\n/gi, '');
  text = text.replace(/<style([\s\S]*?)<\/style>/gi, '');
  text = text.replace(/<script([\s\S]*?)<\/script>/gi, '');
  text = text.replace(/<a.*?href="(.*?)[?"].*?>(.*?)<\/a.*?>/gi, ' $2 $1 ');
  text = text.replace(/<\/div>/gi, '\n\n');
  text = text.replace(/<\/li>/gi, '\n');
  text = text.replace(/<li.*?>/gi, '  *  ');
  text = text.replace(/<\/ul>/gi, '\n\n');
  text = text.replace(/<\/p>/gi, '\n\n');
  text = text.replace(/<br\s*[/]?>/gi, '\n');
  text = text.replace(/<[^>]+>/gi, '');
  text = text.replace(/^\s*/gim, '');
  text = text.replace(/ ,/gi, ',');
  text = text.replace(/ +/gi, ' ');
  text = text.replace(/\n+/gi, '\n\n');
  return text;
};
