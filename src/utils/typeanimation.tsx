let typingTimeout: number | null = null;

export const stopTyping = () => {
  if (typingTimeout !== null) {
    clearTimeout(typingTimeout);
    typingTimeout = null;
  }
};

export const typeLyrics = (
  lyrics: string,
  setTypedLyrics: React.Dispatch<React.SetStateAction<string>>,
  speed: number = 25
) => {
  let index = 0;
  let currentText = '';

  stopTyping();
  setTypedLyrics('');

  const type = () => {
    if (index < lyrics.length) {
      currentText += lyrics.charAt(index);
      setTypedLyrics(currentText);
      index++;
      typingTimeout = window.setTimeout(type, speed);
    }
  };

  type();
};