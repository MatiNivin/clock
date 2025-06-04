import random

SIZE = 9
SUBGRID_SIZE = 3


def is_valid(board, row, col, num):
    if num in board[row]:
        return False
    if num in (board[r][col] for r in range(SIZE)):
        return False
    start_row = row - row % SUBGRID_SIZE
    start_col = col - col % SUBGRID_SIZE
    for r in range(start_row, start_row + SUBGRID_SIZE):
        for c in range(start_col, start_col + SUBGRID_SIZE):
            if board[r][c] == num:
                return False
    return True


def find_empty(board):
    for r in range(SIZE):
        for c in range(SIZE):
            if board[r][c] == 0:
                return r, c
    return None


def solve(board):
    empty = find_empty(board)
    if not empty:
        return True
    row, col = empty
    nums = list(range(1, SIZE + 1))
    random.shuffle(nums)
    for num in nums:
        if is_valid(board, row, col, num):
            board[row][col] = num
            if solve(board):
                return True
            board[row][col] = 0
    return False


def generate_full_board():
    board = [[0] * SIZE for _ in range(SIZE)]
    solve(board)
    return board


def remove_numbers(board, holes=40):
    puzzle = [row[:] for row in board]
    positions = [(r, c) for r in range(SIZE) for c in range(SIZE)]
    random.shuffle(positions)
    for i in range(min(holes, SIZE * SIZE)):
        r, c = positions[i]
        puzzle[r][c] = 0
    return puzzle


def print_board(board):
    for r in range(SIZE):
        line = " ".join(str(num or '.') for num in board[r])
        print(line)


def generate_sudoku(holes=40):
    full_board = generate_full_board()
    puzzle = remove_numbers(full_board, holes)
    return puzzle


if __name__ == "__main__":
    puzzle = generate_sudoku()
    print_board(puzzle)
