# a blazing fast <a href="https://limitless-lowlands-82699.herokuapp.com/"> P2P telemedicine platform </a> for epilepsy diagnosis. </h2>

![image](https://user-images.githubusercontent.com/46613983/182173582-862cd7a3-5f07-4358-b3d1-19b9eb4adce2.png)
![image](https://user-images.githubusercontent.com/46613983/182172134-9fbc2065-50c3-46b5-836a-30fe795a3a8a.png)
![image](https://user-images.githubusercontent.com/46613983/182172253-8f2e65ea-cd20-4148-96b6-681490be9c23.png)


<br>
<i> note: COCO-ssd person recognition model activates when there are two participants in the call and the indicator light is on</i> <br>
<i> note: audio stream is not shared due to time constraint</i>

<br>
<br>

At-home, video recorded EEG (V-AEEG) is a promising advancement in the assessment of Epilepsy. Effectiveness plummets however, when the video recording misses moments of interest due to patient-side errors.
<br><br>

The gold standard at half the cost.

<br>

mindEEG helps V-AEEG reach the same effectiveness as pricey in-hospital assessments by enabling live collaboration between healthcare technicians, patients and AI.  

Designed with unprecedented speed and reliability, we left behind slow, insecure servers for blazing fast peer-to-peer video and EEG streaming. Using BrainsAtPlay’s API, our platform works with many EEG devices. In addition, powerful image recognition ensures the patient is always within the field of view. Due to not having hardware to work with, we currently only support a synthetic EEG. 

<i> Our application consists of a backend and frontend. For the backend, we created an Express server in Node.js that channels users into Socket.io rooms by a unique ID in their URL. This unique ID, also known as an invite link, allows a patient to join the same room as their doctor, provided the doctor sends the invite link to the patient. Once in the same room, we use WebRTC, Socket.io and Peer.js to coordinate a connection between each caller that continuously sends respectives video streams to each other. For the frontend, we use React for the UI. We use Chart.js to visualize the EEG channels and a simple sine-wave generator for the synthetic EEG. To create the image recognition tracker, we use Tensorflow’s COCO-ssd’s image recognition library.</i>
