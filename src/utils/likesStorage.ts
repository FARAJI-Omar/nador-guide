const STORAGE_KEY = 'nador_liked_places';

/**
 * Returns the set of place IDs the user has already liked (persisted in localStorage).
 */
export const getLikedPlaces = (): Set<number> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const ids: number[] = raw ? JSON.parse(raw) : [];
    return new Set(ids);
  } catch {
    return new Set();
  }
};

/**
 * Returns true if the user has already liked the given place.
 */
export const hasLikedPlace = (placeId: number): boolean => {
  return getLikedPlaces().has(placeId);
};

/**
 * Marks a place as liked. Returns false if already liked (no-op), true on success.
 */
export const addLikedPlace = (placeId: number): boolean => {
  const liked = getLikedPlaces();
  if (liked.has(placeId)) return false;
  liked.add(placeId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...liked]));
  return true;
};

/**
 * Removes a place like (for toggle/undo functionality).
 */
export const removeLikedPlace = (placeId: number): void => {
  const liked = getLikedPlaces();
  liked.delete(placeId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...liked]));
};

/**
 * Computes a 0–5 star score based on the likes count.
 * 0 likes → 0, grows logarithmically, capped at 5.
 */
export const computeScore = (likes: number): number => {
  if (!likes || likes <= 0) return 0;
  return parseFloat(Math.min(5, 2 + Math.sqrt(likes) * 0.4).toFixed(1));
};
