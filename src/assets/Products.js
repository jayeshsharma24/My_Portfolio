import imageProduct1 from './images/docker.png' 
import imageProduct2 from './images/aws.png' 
import imageProduct3 from './images/k8s.png' 

export const products = [
    {
        id: 1,
        name: 'Docker Notes',
        price: 499,
        image: imageProduct1,
        description: "Docker is a powerful platform that simplifies the process of developing, packaging, and deploying applications by using containers. It provides an isolated environment, known as a container, where applications can run consistently across different platforms. Docker's popularity stems from its ability to ensure that software runs the same way, regardless of where it's deployed.",
        slug: 'Docker Notes'
    },
    {
        id: 2,
        name: 'AWS Notes',
        price: 749,
        image: imageProduct2,
        description:"Amazon Web Service (AWS) is the world’s leading cloud computing platform by Amazon. It offers on-demand computing services, such as virtual servers and storage, that can be used to build and run applications and websites. AWS is known for its security, reliability, and flexibility, which makes it a popular choice for organizations that need to store and process sensitive data." ,
        slug: 'AWS Notes'
    },
    {
        id: 3,
        name: 'Kubernetes Notes',
        price: 899,
        image: imageProduct3,
        description: "Kubernetes (also called K8s) is an open-source platform that helps you automates the deployment, scaling, and management of containerized applications. In simple words, if you're running a lot of apps using containers (like with Docker), Kubernetes helps you organize and control them efficiently just like a traffic controller for your apps.",
        slug: 'Kubernetes Notes'
    },
   
];