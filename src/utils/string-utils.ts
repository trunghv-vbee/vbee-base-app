/* eslint-disable no-extend-native */
/* eslint-disable radix */
declare global {
  interface String {
    formatPrice(): string;
    isEmail(): boolean;
    isPhoneNumber(): boolean;
    isUrl(): boolean;
    unsignText(): string;
    regexSearchText(): string;
    removeWhiteSpace(): string;
    createUniqueText(): string;
    replaceAll(oldText: string, newText: string): string;
    toNumber(): number;
  }
  interface Number {
    formatPrice(): string;
  }
  interface Date {
    isValidDate(): boolean;
  }
}

Number.prototype.formatPrice = function () {
  return this.toFixed(2)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    .replace('.00', '')
    .replace(/,/g, '.');
};
String.prototype.formatPrice = function () {
  let price = parseInt(String(this));
  return price
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    .replace('.00', '')
    .replace(/,/g, '.');
};
String.prototype.isEmail = function () {
  const re =
    /^([a-zA-Z0-9]+((\.|_)?[a-zA-Z0-9]+)*)+@[a-zA-Z0-9][a-zA-Z0-9-]{1,61}([a-zA-Z0-9].[a-zA-Z]{2,})+$/g;
  return re.test(this.toLowerCase());
};

String.prototype.isPhoneNumber = function () {
  const re = /^(\+?84|0|\(\+?84\))[1-9]\d{8,9}$/g;
  return re.test(String(this));
};

String.prototype.isUrl = function () {
  try {
    var str = this.toLowerCase();
    var re =
      /^(?:(?:https?|http):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    return re.test(str);
  } catch (error) {
    return false;
  }
};

String.prototype.unsignText = function () {
  try {
    var str = String(this);
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    return str;
  } catch (error) {
    return '';
  }
};
String.prototype.regexSearchText = function () {
  try {
    var str = '.*' + String(this);
    str = str.replace(
      /a|à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,
      '(a|à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)',
    );
    str = str.replace(/e|è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, '(e|è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)');
    str = str.replace(/i|ì|í|ị|ỉ|ĩ/g, '(i|ì|í|ị|ỉ|ĩ)');
    str = str.replace(
      /o|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,
      '(o|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)',
    );
    str = str.replace(/u|ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, '(u|ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)');
    str = str.replace(/y|ỳ|ý|ỵ|ỷ|ỹ/g, '(y|ỳ|ý|ỵ|ỷ|ỹ)');
    str = str.replace(/d|đ/g, '(d|đ)');
    str = str.replace(
      /A|À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g,
      '(A|À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)',
    );
    str = str.replace(/E|È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, '(E|È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)');
    str = str.replace(/I|Ì|Í|Ị|Ỉ|Ĩ/g, '(I|Ì|Í|Ị|Ỉ|Ĩ)');
    str = str.replace(
      /O|Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g,
      '(O|Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)',
    );
    str = str.replace(/U|Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, '(U|Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)');
    str = str.replace(/Y|Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, '(Y|Ỳ|Ý|Ỵ|Ỷ|Ỹ)');
    str = str.replace(/D|Đ/g, '(D|Đ)');
    return str;
  } catch (error) {
    return '';
  }
};
String.prototype.removeWhiteSpace = function () {
  return this.replace(/ /g, '');
};
String.prototype.createUniqueText = function () {
  return this.unsignText().removeWhiteSpace();
};

export default {
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      s4() +
      s4()
    );
  },
};
String.prototype.replaceAll = function (oldText, newText) {
  let text = this.toString();
  while (text.indexOf(oldText) !== -1) {
    text = text.replace(oldText, newText);
  }
  return text;
};
String.prototype.toNumber = function () {
  try {
    return parseInt(String(this));
  } catch (error) {}
  return 0;
};

Date.prototype.isValidDate = function () {
  return !isNaN(this.getTime());
};
