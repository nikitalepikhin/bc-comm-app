export const calculateVotes = (up: number, down: number, currentVote: number, dir: number) => {
  let result = {};
  if (currentVote === 0) {
    // if currently there's no vote
    if (dir === 1) {
      result = { up: up + 1, down, dir };
    } else if (dir === -1) {
      result = { up, down: down + 1, dir };
    }
  } else if (currentVote === 1) {
    // if currently there's an upvote
    if (dir === 0) {
      result = { up: up - 1, down, dir };
    } else if (dir === -1) {
      result = { up: up - 1, down: down + 1, dir };
    }
  } else if (currentVote === -1) {
    // if currently there's a downvote
    if (dir === 0) {
      result = { up, down: down - 1, dir };
    } else if (dir === 1) {
      result = { up: up + 1, down: down - 1, dir };
    }
  }
  return result;
};
