/**
 * Time-based utilities for the fitness app
 */

export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return "Good morning";
  } else if (hour >= 12 && hour < 17) {
    return "Good afternoon";
  } else if (hour >= 17 && hour < 22) {
    return "Good evening";
  } else {
    return "Good evening";
  }
}

export function getMotivationalMessage(): string {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return "ready to start strong?";
  } else if (hour >= 12 && hour < 17) {
    return "time to stay active?";
  } else if (hour >= 17 && hour < 22) {
    return "ready to finish strong?";
  } else {
    return "ready to plan tomorrow?";
  }
}