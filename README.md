<h3> 💕 a decentralized, blazing-fast <a href="https://limitless-lowlands-82699.herokuapp.com/" target="_blank"> P2P telemedicine platform </a> for at-home epilepsy diagnosis. </h3>
note: heroku app may fall sleep due to inactivity. takes ~20 seconds to start up again

![image](https://user-images.githubusercontent.com/46613983/182173582-862cd7a3-5f07-4358-b3d1-19b9eb4adce2.png)
![image](https://user-images.githubusercontent.com/46613983/182172134-9fbc2065-50c3-46b5-836a-30fe795a3a8a.png)
![image](https://user-images.githubusercontent.com/46613983/182172253-8f2e65ea-cd20-4148-96b6-681490be9c23.png)

Designed with unprecedented speed and reliability, mindEEG leaves behind slow, insecure servers for blazing fast peer-to-peer video and EEG streaming. Using BrainsAtPlay’s API, our platform works with many EEG devices. In addition, powerful image recognition ensures the patient is always within the field of view. 

<i> Our application consists of a backend and frontend. For the backend, I created an Express server in Node.js that channels users into Socket.io rooms by a unique ID in their URL. This unique ID, also known as an invite link, allows a patient to join the same room as their doctor, provided the doctor sends the invite link to the patient. Once in the same room, I use WebRTC, Socket.io and Peer.js to coordinate a connection between each caller that continuously sends respectives video streams to each other. For the frontend, I use React for the UI. I use Chart.js to visualize the EEG channels and a simple sine-wave generator for the synthetic EEG. To create the image recognition tracker, we use Tensorflow’s COCO-ssd’s image recognition library.</i>


