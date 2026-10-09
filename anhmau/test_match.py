import cv2
import numpy as np

def test_match(screen_path, element_path):
    screen = cv2.imread(screen_path, cv2.IMREAD_UNCHANGED)
    if screen.shape[2] == 4:
        # Just use BGR for matching
        screen = screen[:, :, :3]
    
    element = cv2.imread(element_path, cv2.IMREAD_UNCHANGED)
    if element is None or screen is None:
        return False
        
    if element.shape[0] > screen.shape[0] or element.shape[1] > screen.shape[1]:
        return False

    if len(element.shape) < 3 or element.shape[2] != 4:
        res = cv2.matchTemplate(screen, element[:,:,:3] if len(element.shape)==3 else element, cv2.TM_CCOEFF_NORMED)
        _, max_val, _, _ = cv2.minMaxLoc(res)
        print(f"No alpha, max_val: {max_val}")
        return max_val > 0.95
        
    element_bgr = element[:, :, :3]
    element_alpha = element[:, :, 3]
    
    if np.all(element_alpha == 0):
        print("Element is fully transparent")
        return False

    mask = cv2.merge([element_alpha, element_alpha, element_alpha])
    
    res = cv2.matchTemplate(screen, element_bgr, cv2.TM_CCORR_NORMED, mask=mask)
    _, max_val, _, _ = cv2.minMaxLoc(res)
    print(f"With alpha mask, max_val: {max_val}")
    
    return max_val > 0.95

print("Testing 1588_home_.png against 61_menu_white.png")
test_match("1588_home_.png", "61_menu_white.png")
print("Testing 1588_home_.png against 999_vector.png")
test_match("1588_home_.png", "999_vector.png")
