import { OptionType } from '@/shared/types/common.type';

export class CommonUtil {
  static isEmpty(str: string) {
    return !str || str.trim() === '';
  }

  /**
   * 문자열을 JSON 형식으로 변환
   * @param str 문자열
   * @returns JSON 형식의 문자열
   */
  static stringToJson(str: string) {
    if (this.isEmpty(str)) {
      throw new Error('문자열이 비어있습니다.');
    }

    return JSON.stringify(str, null, 2);
  }

  /**
   * 휴대폰 번호 '-'가 있다면 제거, 없으면 그대로 반환
   * @example
   * 010-123-4567 -> 0101234567
   * 010-1234-5678 -> 01012345678
   * 01012345678 -> 01012345678
   *
   * @param phone 휴대폰 번호
   * @returns '-' 제거된 휴대폰 번호
   */
  static formatPhoneWithoutHyphen(phone: string) {
    return phone.trim().replace(/-/g, '');
  }

  /**
   * 휴대폰 번호 '-'가 없다면 '-'를 추가
   * @example
   * 01012345678 -> 010-1234-5678
   * 0101234567 -> 010-123-4567
   *
   * @param phone 휴대폰 번호
   * @returns '-'가 추가된 휴대폰 번호
   */
  static formatPhoneWithHyphen(phone: string) {
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }

  /**
   * 문자열에서 모든 점을 줄바꿈으로 변환
   * @param str 문자열
   * @returns 모든 점이 줄바꿈으로 변환된 문자열
   */
  static replaceAllDotsToNewLine(str: string) {
    return str.replace(/\./g, '.\n');
  }

  /**
   * 파일을 FormData에 append하는 공통 함수
   * 파일 이름이 한글이 깨지는 것을 방지하기 위해 인코딩 처리
   * @param formData FormData 객체
   * @param file 파일 객체
   * @param key FormData에 append할 key 값
   */
  static appendFileEncodedToFormData(formData: FormData, file: File, key: string): void {
    const blob = file.slice(0, file.size, file.type);
    const encodedFile = new File([blob], encodeURIComponent(file.name), { type: file.type });
    formData.append(key, encodedFile);
  }

  static changeListToOption<T extends OptionType<string>>(list: T[]) {
    return list.map((item) => ({
      label: item.label,
      value: item.value,
    }));
  }
}
