import { Dongle } from 'next/font/google'
import localFont from 'next/font/local'

const dongle = Dongle({weight: '700', subsets: ['latin'] });
const heyComic = localFont({ src: '../public/font/HeyComic.ttf' });

export {dongle, heyComic}


