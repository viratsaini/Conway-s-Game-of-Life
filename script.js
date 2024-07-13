const canvas=document.getElementById('gameCanvas');
const ctx=canvas.getContext('2d');
const startButton=document.getElementById('startButton');
const randomButton =document.getElementById('randomButton');
const clearButton=document.getElementById('clearButton');

const rows=30;
const cols=30;
const cellSize=canvas.width/cols;
let grid=createGrid();
let running=false;

function createGrid() 
{
    return new Array(rows).fill(null).map(()=>new Array(cols).fill(0));
}

function drawGrid() 
{
    ctx.clearRect(0,0,canvas.width,canvas.height);

    for (let row=0;row<rows;row++)
    {
        for (let col=0;col<cols;col++) 
        {
            ctx.fillStyle=grid[row][col] ? '#865d36':'#ac8968';
            ctx.fillRect(col*cellSize,row*cellSize,cellSize,cellSize);
            ctx.strokeRect(col*cellSize,row*cellSize,cellSize,cellSize);
        }
    }
}

function updateGrid()
{
    const newGrid=grid.map(arr =>[...arr]);

    for(let row=0;row<rows;row++) 
        {
        for(let col=0;col<cols;col++) 
            {
            const neighbors=countNeighbors(grid,row,col);
            if (grid[row][col] === 1)
                 {
                if (neighbors<2 || neighbors>3) {
                    newGrid[row][col] =0;
                }
            } 
            else {
                if (neighbors === 3) {
                    newGrid[row][col] =1;
                }
            }
        }
    }
    grid = newGrid;
}

function countNeighbors(grid,row,col) 
{
    let count = 0;
    for (let i =-1;i<=1;i++) 
        {
        for (let j=-1;j<=1;j++)
            {
            if (i === 0 && j === 0) {
                continue;
            }
            const x =row+i;
            const y =col+j;
            if (x>=0 && x < rows && y>=0 && y<cols) {
                count += grid[x][y];
            }
        }
    }
    return count;
}

function randomGrid()
{
    grid =grid.map(row =>row.map(() =>Math.floor(Math.random()*2)));
}

function clearGrid() 
{
    grid = grid.map(row =>row.map(()=>0));
}

function gameLoop() 
{
    if (running) {
        updateGrid();
        drawGrid();
        requestAnimationFrame(gameLoop);
    }
}

canvas.addEventListener('click', (e) =>
{
    const x =Math.floor(e.offsetX/cellSize);
    const y =Math.floor(e.offsetY/cellSize);
    grid[y][x] =grid[y][x] ? 0:1;
    drawGrid();
});

startButton.addEventListener('click',()=> 
{
    running = !running;
    startButton.textContent = running ? 'Stop':'Start';
    if (running) {
        gameLoop();
    }
});

randomButton.addEventListener('click',()=> 
{
    randomGrid();
    drawGrid();
});

clearButton.addEventListener('click',()=> 
{
    clearGrid();
    drawGrid();
});
drawGrid();
