const noteImages = [
    './assets/note1.svg',
    './assets/note2.svg',
    './assets/note3.svg',
    './assets/note4.svg'
  ];
  export const generateNotes = () => {
    const notes = [];
  
    for (let i = 0; i < 200; i++) {
      const left = Math.random() * 100;
      const bottom = Math.random() * 100;
      const rotationDuration = 8 + Math.random() * 5;
      const imgSrc = noteImages[Math.floor(Math.random() * noteImages.length)];
  
      notes.push(
        <img
          key={i}
          src={imgSrc}
          alt="note"
          className="note"
          style={{
            left: `${left}%`,
            bottom: `${bottom}%`,
            animation: `floatUpAndRotate ${rotationDuration}s ease-in-out infinite`,
          }}
        />
      );
    }
  
    return notes;
  };

  