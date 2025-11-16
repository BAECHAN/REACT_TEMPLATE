import { useEffect } from 'react';

type KeyCombo = {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
};

/**
 * 키보드 단축키를 처리하는 커스텀 훅
 * @param keyCombo - 감지할 키 조합 설정
 * Windows: Ctrl + key (예: { key: 'b', ctrlKey: true })
 * Mac: Command(⌘) + key로 자동 변환
 * @param callback - 키 입력시 실행할 콜백 함수
 */
export function useKeydown(keyCombo: KeyCombo, callback: (event?: KeyboardEvent) => void) {
  useEffect(() => {
    // macOS 확인 (데스크톱 환경만 고려)
    const isMac = /Mac/i.test(navigator.userAgent);

    const handleKeyDown = (event: KeyboardEvent) => {
      const isKeyMatch = event.key.toLowerCase() === keyCombo.key.toLowerCase();

      // Mac에서는 ctrlKey 대신 metaKey(Command) 사용
      const isCtrlMatch = keyCombo.ctrlKey
        ? isMac
          ? event.metaKey
          : event.ctrlKey
        : !(isMac ? event.metaKey : event.ctrlKey);

      const isAltMatch = keyCombo.altKey ? event.altKey : !event.altKey;
      const isShiftMatch = keyCombo.shiftKey ? event.shiftKey : !event.shiftKey;

      if (isKeyMatch && isCtrlMatch && isAltMatch && isShiftMatch) {
        event.preventDefault();
        callback(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback, keyCombo]);
}
