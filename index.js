const gridPuzzle = () => {
  const blocks = document.querySelectorAll(".block");
  const resetBtn = document.querySelector(".btn-reset");

  const parent = document.querySelector(".square-body");
  const initialOrder = Array.from(blocks);

  const COLS = 5;

  function getNeighbor(block, direction) {
    const allBlocks = Array.from(parent.querySelectorAll(".block"));
    const currentIndex = allBlocks.indexOf(block);

    let neighborIndex = -1;

    switch (direction) {
      case "top":
        neighborIndex = currentIndex - COLS;
        if (neighborIndex < 0) return null;
        break;

      case "bottom":
        neighborIndex = currentIndex + COLS;
        if (neighborIndex >= allBlocks.length) return null;
        break;

      case "left":
        neighborIndex = currentIndex - 1;
        if (currentIndex % COLS === 0) {
          neighborIndex = currentIndex - 1;
          if (neighborIndex < 0) return null;
        }
        break;

      case "right":
        neighborIndex = currentIndex + 1;т
        if ((currentIndex + 1) % COLS === 0) {
          if (neighborIndex >= allBlocks.length) return null;
        }
        break;
    }

    if (neighborIndex >= 0 && neighborIndex < allBlocks.length) {
      return allBlocks[neighborIndex];
    }

    return null;
  }

  function swapBlocks(block1, block2) {
    const temp = document.createElement("div");
    block1.parentNode.insertBefore(temp, block1);
    block2.parentNode.insertBefore(block1, block2);
    temp.parentNode.insertBefore(block2, temp);
    temp.remove();
  }

  function resetGrid() {
    initialOrder.forEach((block) => {
      parent.appendChild(block);
    });
  }

  blocks.forEach((block) => {
    const arrows = block.querySelectorAll(".arrow");

    arrows.forEach((arrow) => {
      arrow.addEventListener("click", (e) => {
        e.stopPropagation();

        let direction = "";
        if (arrow.classList.contains("top")) direction = "top";
        else if (arrow.classList.contains("bottom")) direction = "bottom";
        else if (arrow.classList.contains("left")) direction = "left";
        else if (arrow.classList.contains("right")) direction = "right";

        if (!direction) return;

        const neighbor = getNeighbor(block, direction);

        if (neighbor) {
          swapBlocks(block, neighbor);
        }
      });
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", resetGrid);
  }
};

gridPuzzle();
