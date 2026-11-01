import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(ScrollTrigger, Draggable)

// One shared easing keeps every animation feeling like part of the same site.
export const defaultEase = 'power3.out'

export { gsap, ScrollTrigger, Draggable }
