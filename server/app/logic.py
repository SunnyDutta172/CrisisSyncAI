import cv2
import numpy as np
from collections import deque
import os


def find_exits(grid):
    rows, cols = len(grid), len(grid[0])
    exits = []

    for i in range(rows):
        for j in range(cols):
            if (i == 0 or i == rows - 1 or j == 0 or j == cols - 1) and grid[i][j] == 1:
                exits.append((i, j))

    return exits


def bfs(grid, start, exits):
    rows, cols = len(grid), len(grid[0])

    queue = deque([(start, [start])])
    visited = set([start])

    directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

    while queue:
        (x, y), path = queue.popleft()

        if (x, y) in exits:
            return path

        for dx, dy in directions:
            nx, ny = x + dx, y + dy

            if 0 <= nx < rows and 0 <= ny < cols:
                if (nx, ny) not in visited and grid[nx][ny] == 1:
                    visited.add((nx, ny))
                    queue.append(((nx, ny), path + [(nx, ny)]))

    return None


def block_fire_area(grid, fire_pos, radius=2):
    i, j = fire_pos

    for dx in range(-radius, radius + 1):
        for dy in range(-radius, radius + 1):
            ni, nj = i + dx, j + dy
            if 0 <= ni < len(grid) and 0 <= nj < len(grid[0]):
                grid[ni][nj] = 0

    return grid


def create_grid_from_image(image_path, rows=50, cols=50, threshold=230):
    img = cv2.imread(image_path)

    if img is None:
        raise ValueError("Image could not be loaded. Check file path.")

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, binary = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY)

    h, w = binary.shape
    cell_h = h // rows
    cell_w = w // cols

    grid = np.zeros((rows, cols), dtype=int)

    for i in range(rows):
        for j in range(cols):
            block = binary[i * cell_h:(i + 1) * cell_h,
                           j * cell_w:(j + 1) * cell_w]

            if np.mean(block) > threshold:
                grid[i][j] = 1
            else:
                grid[i][j] = 0

    return img, grid, h, w


def compute_escape_path(image_path, start, fire_pos, rows=50, cols=50):
    img, grid, h, w = create_grid_from_image(image_path, rows, cols)

    if grid[start[0]][start[1]] == 0:
        return {
            "success": False,
            "message": "Start position is on a wall",
            "path": None
        }

    grid = block_fire_area(grid, fire_pos, radius=2)

    exits = find_exits(grid)

    if not exits:
        return {
            "success": False,
            "message": "No exits detected",
            "path": None
        }

    path = bfs(grid, start, exits)

    if path is None:
        return {
            "success": False,
            "message": "No valid path found",
            "path": None
        }

    else:

        image_copy = img.copy()

        scale_x = w / cols
        scale_y = h / rows
        
        # 🔴 FIRE
        overlay = image_copy.copy()
        
        fi, fj = fire_pos
        
        for dx in range(-2, 3):
            for dy in range(-2, 3):
                ni, nj = fi + dx, fj + dy
                
                if 0 <= ni < rows and 0 <= nj < cols:
                    x1 = int(nj * scale_x)
                    y1 = int(ni * scale_y)
                    x2 = int((nj + 1) * scale_x)
                    y2 = int((ni + 1) * scale_y)
        
                    cv2.rectangle(overlay, (x1, y1), (x2, y2), (0, 0, 255), -1)
        
        image_copy = cv2.addWeighted(overlay, 0.4, image_copy, 0.6, 0)
        
        # 🟢 PATH
        points = []
        for (i, j) in path:
            x = int(j * scale_x + scale_x / 2)
            y = int(i * scale_y + scale_y / 2)
            points.append([x, y])
        
        points = np.array(points, dtype=np.int32).reshape((-1, 1, 2))
        cv2.polylines(image_copy, [points], False, (0, 255, 0), 5)
        
        # 🔵 START
        sx = int(start[1] * scale_x + scale_x / 2)
        sy = int(start[0] * scale_y + scale_y / 2)
        cv2.circle(image_copy, (sx, sy), 6, (255, 0, 0), -1)

        output_path = os.path.join("static", "output", "result.png")
        cv2.imwrite(output_path, image_copy)
        
        return {
            "success": True,
            "message": "Path found",
            "path": path,
            "image": output_path,
            "rows": rows,
            "cols": cols,
            "image_height": h,
            "image_width": w
        }