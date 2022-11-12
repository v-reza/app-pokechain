export function getArena(level) {
  switch (level) {
    case 1: {
      return {
        required_point_level_up: 1000,
        level_up_to: 2
      };
    }
    case 2: {
      return {
        required_point_level_up: 2000,
        level_up_to: 3
      }
    }
    case 3: {
      return {
        required_point_level_up: 3000,
        level_up_to: 4
      }
    }
    case 4: {
      return {
        required_point_level_up: 4000,
        level_up_to: 5
      }
    }
    case 5: {
      return {
        required_point_level_up: 5000,
      }
    }
  }
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
