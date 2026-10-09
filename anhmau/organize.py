import os
import shutil
import re

screen_ids = sorted([
    1, 61, 144, 189, 300, 524, 603, 728, 963, 1083, 1270, 1323, 1499, 1588, 2001, 2151, 2233, 2378, 2489, 2546, 2602, 2658, 2682, 2834
])

def get_screen_id(file_id):
    # Find the largest screen_id that is <= file_id
    assigned_screen = None
    for sid in screen_ids:
        if file_id >= sid:
            assigned_screen = sid
        else:
            break
    return assigned_screen

files = [f for f in os.listdir('.') if f.endswith('.png') and '_' in f]

screen_map = {}
for f in files:
    m = re.match(r'^(\d+)_', f)
    if m:
        fid = int(m.group(1))
        if fid in screen_ids:
            # It's a root screen
            name_part = f[len(m.group(0)):-4] # strip ID_ and .png
            screen_map[fid] = name_part

print("Screens mapping:")
for sid, name in screen_map.items():
    print(f"{sid}: {name}")

for f in files:
    m = re.match(r'^(\d+)_', f)
    if m:
        fid = int(m.group(1))
        sid = get_screen_id(fid)
        if sid is not None and sid in screen_map:
            folder_name = screen_map[sid]
            # Create folder if it doesn't exist
            if not os.path.exists(folder_name):
                os.makedirs(folder_name)
            
            src = f
            dst = os.path.join(folder_name, f)
            shutil.move(src, dst)
            # print(f"Moved {src} to {dst}")

print("Done grouping files.")
