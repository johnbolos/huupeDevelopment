// Testimonial Videos
import jahzere from '../videos/testimonials/jahzere.mp4';
import john from '../videos/testimonials/john.mp4';
import matteo from '../videos/testimonials/matteo.mp4';
import aauteam from '../videos/testimonials/aauteam.mp4';
import austin from '../videos/testimonials/austin.mp4';
import dyson from '../videos/testimonials/dyson.mp4';
import anosike from '../videos/testimonials/anosike.mp4';
import tsineke from '../videos/testimonials/tsineke.mp4';
import fafalu from '../videos/testimonials/fafalu.mp4';
import jackson from '../videos/testimonials/jackson.mp4';
import stefan from '../videos/testimonials/stefan.mp4';
import slim from '../videos/testimonials/slimReaper.mp4';
// Testimonial Images
import jahzereImg from '../images/testimonials/jahzere.webp';
import johnImg from '../images/testimonials/john.jpeg';
import matteoImg from '../images/testimonials/matteo.webp';
import aauteamImg from '../images/testimonials/aauteam.webp';
import austinImg from '../images/testimonials/austin.webp';
import dysonImg from '../images/testimonials/dyson.webp';
import anosikeImg from '../images/testimonials/anosike.webp';
import tsinekeImg from '../images/testimonials/tsineke.webp';
import fafaluImg from '../images/testimonials/fafalu.webp';
import jacksonImg from '../images/testimonials/jackson.webp';
import stefanImg from '../images/testimonials/stefan.webp';
import slimImg from '../images/testimonials/slimReaper.webp';

const testimonials: Testimony[] = [
  {
    video: jahzere,
    img: jahzereImg,
    height: '1080',
    width: '1920',
    title:
      'I think the huupe is dope...[I’m] always looking for different tools to get better, track my shots all types of stuff.',
    name: 'Jahzare Jackson',
    stars: 5,
    altText: 'A young man with dreadlocks smiling in a gym',
  },
  {
    video: john,
    img: johnImg,
    height: '1080',
    width: '1920',
    title:
      'It’s gonna help the next generation as they’re working on their game',
    name: 'John',
    stars: 4.5,
    altText: 'A man with dreadlocks standing in a gym smiling at the camera',
  },
  {
    video: slim,
    img: slimImg,
    height: '1080',
    width: '1920',
    title: 'I promise you, I’ll be in front of this thing all day',
    name: 'Slim Reaper',
    stars: 5,
    altText: 'a man looking at the camera and smiling',
  },
  {
    video: matteo,
    img: matteoImg,
    height: '652',
    width: '841',
    title:
      'Every single person that has walked in there and used the huupe, have walked out and go ‘Damn, I would love one of these in my house',
    name: 'Matteo Attalla',
    stars: 5,
    altText: 'Three men sitting on stools sitting in a boxing ring',
  },
  {
    video: aauteam,
    img: aauteamImg,
    height: '1080',
    width: '1920',
    title:
      'You can be watching a move, and learning a new move at the same time',
    name: 'AEF PRO CAMP',
    stars: 4.5,
    altText: 'a group of young men in basketball uniforms posing for a picture',
  },
  {
    video: austin,
    img: austinImg,
    height: '1080',
    width: '1920',
    title:
      'It felt like any other hoop. Outside. Inside. Just felt like a regular hoop',
    name: 'Austin Herro',
    stars: 5,
    altText: 'A young man sitting in a boxing ring',
  },
];

const testimonials2: Testimony[] = [
  {
    video: dyson,
    img: dysonImg,
    height: '1080',
    width: '1920',
    title: 'Man I love this huupe…',
    name: 'Dyson Daniels',
    stars: 5,
    altText: 'A young man holding a basketball in a gym',
  },
  {
    video: anosike,
    img: anosikeImg,
    height: '1080',
    width: '1920',
    title: 'Great basketball tool for development',
    name: 'EJ Anosike',
    stars: 4.5,
    altText: 'A young man holding a basketball in front of a wall',
  },
  {
    video: tsineke,
    img: tsinekeImg,
    height: '2160',
    width: '4096',
    title:
      'It does everything… I’m definitely going to need to use that in the future',
    name: 'Elene Tsineke',
    stars: 5,
    altText: 'A female basketball player smiling and pointing at the huupe',
  },
  {
    video: fafalu,
    img: fafaluImg,
    height: '1080',
    width: '1920',
    title:
      'It’s super cool! I’ve never seen anything like it. It makes basketball really fun!',
    name: 'Fafalu',
    stars: 5,
    altText: 'A young man smiling on a basketball court',
  },
  {
    video: jackson,
    img: jacksonImg,
    height: '1080',
    width: '1920',
    title: 'This thing is the future for sure.',
    name: 'Jackson Smyth',
    stars: 5,
    altText: 'A young man smiling at a camera on a basketball court',
  },
  {
    video: stefan,
    img: stefanImg,
    height: '1080',
    width: '1920',
    title:
      'I liked it because it tracked how many shots I made and missed, and I like the games on the huupe',
    name: 'Stefan',
    stars: 4.5,
    altText: 'A woman and young boy standing in front of a huupe',
  },
];

export {testimonials, testimonials2};
