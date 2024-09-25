document.addEventListener("DOMContentLoaded", () => {
  const inputElement = document.querySelector(".input");
  const notificationElement = document.querySelector(".notification");
  const outputElement = document.querySelector(".output_code");
  const title = document.querySelector(".title");
  const changeCode = document.querySelector(".vector");
  const blocks = document.querySelectorAll(".block");
  let marker = true;
  changeCode.addEventListener("click", (event) => {
    if (title.innerHTML == "Кодировка NRZ") {
      marker = false;
      title.innerHTML = "Кодировка AMI";
      clearBlocks();
      outputElement.textContent = "";
    } else {
      marker = true;
      title.innerHTML = "Кодировка NRZ";
      clearBlocks();
      outputElement.textContent = "";
    }
  });

  inputElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      clearBlocks();
      const inputValue = inputElement.value;
      const binaryRegex = /^[01]+$/;

      if (!binaryRegex.test(inputValue)) {
        notificationElement.textContent = "Введите двоичный код";
        inputElement.value = "";
        outputElement.textContent = "";
        clearBlocks();
      } else if (inputValue.length > 32) {
        notificationElement.textContent = "Максимальная длина 32 символа";
        inputElement.value = "";
        outputElement.textContent = "";
        clearBlocks();
      } else {
        if (marker == true) {
          notificationElement.textContent = "";
          const formattedValue = inputValue
            .split("")
            .join(" ")
            .replace(/1/g, "+U");
          outputElement.textContent = formattedValue;

          // Заполняем первые 32 блока символами из строки пользователя
          for (let i = 0; i < 32; i++) {
            if (i < inputValue.length) {
              blocks[i].textContent = inputValue[i];
            } else {
              blocks[i].textContent = "";
            }
          }

          // Заполняем вторые 32 блока стилями в зависимости от символов из строки пользователя
          for (let i = 0; i < 32; i++) {
            if (i < inputValue.length) {
              const currentBit = inputValue[i];
              const previousBit = i > 0 ? inputValue[i - 1] : null;

              if (currentBit === "0") {
                blocks[i + 32].style.borderTop = "1px solid #444444";
                blocks[i + 32].style.borderBottom = "none";
              } else {
                blocks[i + 32].style.borderBottom = "1px solid #444444";
                blocks[i + 32].style.borderTop = "none";
              }

              if (previousBit !== null && previousBit !== currentBit) {
                blocks[i + 32].style.borderLeft = "1px solid #444444";
              } else {
                blocks[i + 32].style.borderLeft = "none";
              }
            } else {
              blocks[i + 32].style.borderTop = "none";
              blocks[i + 32].style.borderBottom = "none";
              blocks[i + 32].style.borderLeft = "none";
            }
          }
        } else {
          notificationElement.textContent = "";
          const formattedValue = formatBinaryString(inputValue);
          outputElement.textContent = formattedValue;

          // Заполняем первые 32 блока символами из строки пользователя
          for (let i = 0; i < 32; i++) {
            if (i < inputValue.length) {
              blocks[i].textContent = inputValue[i];
            } else {
              blocks[i].textContent = "";
            }
          }
          let toggle = true;
          let toggle2 = true;
          let toggle3 = true;

          // Заполняем вторые 32 блока стилями в зависимости от символов из строки пользователя
          for (let i = 0; i < 32; i++) {
            if (i < inputValue.length) {
              const currentBit = inputValue[i];

              const previousBit = i > 0 ? inputValue[i - 1] : null;

              if (currentBit === "0") {
                if (previousBit === "0") {
                  blocks[i + 32].style.borderBottom = "1px solid #444444";
                  blocks[i + 32].style.borderTop = "none";
                } else {
                  if (toggle) {
                    blocks[i + 32].style.borderBottom = "1px solid #444444";
                    blocks[i + 32].style.borderTop = "none";
                    blocks[i + 64].style.borderLeft = "1px solid #444444";
                  } else {
                    blocks[i + 32].style.borderBottom = "1px solid #444444";
                    blocks[i + 32].style.borderTop = "none";
                    blocks[i + 32].style.borderLeft = "1px solid #444444";
                  }
                }
              } else {
                if (previousBit === "0") {
                  if (toggle) {
                    blocks[i + 32].style.borderTop = "1px solid #444444";
                    blocks[i + 32].style.borderLeft = "1px solid #444444";
                    blocks[i + 32].style.borderBottom = "none";
                    toggle = false;
                  } else {
                    blocks[i + 64].style.borderBottom = "1px solid #444444";
                    blocks[i + 64].style.borderLeft = "1px solid #444444";
                    blocks[i + 64].style.borderTop = "none";
                    toggle = true;
                  }
                } else {
                  if (toggle) {
                    blocks[i + 32].style.borderTop = "1px solid #444444";
                    blocks[i + 32].style.borderLeft = "1px solid #444444";
                    blocks[i + 64].style.borderLeft = "1px solid #444444";
                    blocks[i + 32].style.borderBottom = "none";
                    toggle = false;
                  } else {
                    blocks[i + 64].style.borderBottom = "1px solid #444444";
                    blocks[i + 32].style.borderLeft = "1px solid #444444";
                    blocks[i + 64].style.borderLeft = "1px solid #444444";
                    blocks[i + 64].style.borderTop = "none";
                    toggle = true;
                  }
                }
              }

              //   if (previousBit !== null && previousBit !== currentBit) {
              //     if (toggle2) {
              //       blocks[i + 32].style.borderLeft = "1px solid #444444";
              //       toggle2 = false;
              //     } else {
              //       blocks[i + 64].style.borderLeft = "1px solid #444444";
              //       toggle2 = true;
              //     }
              //   } else {
              //     if (previousBit == 1) {
              //       blocks[i + 32].style.borderLeft = "1px solid #444444";
              //       blocks[i + 64].style.borderLeft = "1px solid #444444";
              //     } else {
              //       blocks[i + 32].style.borderLeft = "none";
              //     }
              //   }
            } else {
              blocks[i + 32].style.borderTop = "none";
              blocks[i + 32].style.borderBottom = "none";
              blocks[i + 32].style.borderLeft = "none";
              blocks[i + 64].style.borderTop = "none";
              blocks[i + 64].style.borderBottom = "none";
              blocks[i + 64].style.borderLeft = "none";
            }
          }
        }
      }
    }
  });

  function clearBlocks() {
    blocks.forEach((block) => {
      block.textContent = "";
      block.style.borderTop = "none";
      block.style.borderBottom = "none";
      block.style.borderLeft = "none";
    });
  }
  function formatBinaryString(binaryString) {
    let toggle = true;
    return binaryString
      .split("")
      .map((bit) => {
        if (bit === "1") {
          const replacement = toggle ? "+U" : "-U";
          toggle = !toggle;
          return replacement;
        }
        return bit;
      })
      .join(" ");
  }
});
