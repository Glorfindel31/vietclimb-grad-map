<script setup lang="ts"></script>

<template>
    <div class="m-4 p-8 border rounded-md">
        <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Vietclimb Route Setting Map
        </h1>
        <h2
            class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Overview
        </h2>
        <p class="leading-7 [&:not(:first-child)]:mt-6">
            Vietclimb Route Setting Map is a modern and efficient platform designed to
            provide climbers with a comprehensive view of the climbing routes available in
            the gym. This project aims to enhance the climbing experience by offering
            detailed information about the routes, including their grades, the number of
            routes, and the climbers who have set them up.
        </p>
        <h2
            class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Features
        </h2>
        <ul class="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>
                <strong>Express REST API</strong>: The backend of the application is built
                with Express, which connects to a Google Sheet to fetch the latest data on
                climbing routes.
            </li>
            <li>
                <strong>Vite and Vue</strong>: The frontend is developed using Vue 3 and
                Vite, ensuring a fast and efficient development process.
            </li>
            <li>
                <strong>Shadcn and Radix</strong>: The project leverages Shadcn and Radix
                for its component library, providing a visually appealing and responsive
                user interface.
            </li>
            <li>
                <strong>Unovis for Charts</strong>: Visualization of climbing route data
                is achieved through Unovis, offering dynamic and interactive charts.
            </li>
            <li>
                <strong>Three.js for Map Visualization</strong>: Planned integration of
                Three.js will enable a 3D map of the gym, enhancing the user experience.
            </li>
            <li>
                <strong>Deployment on Vercel</strong>: The application is deployed on
                Vercel, ensuring high availability and performance.
            </li>
        </ul>
        <h2
            class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Getting Started
        </h2>
        <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            Prerequisites
        </h3>
        <ul class="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Node.js (version 14 or higher)</li>
            <li>npm (version 6 or higher)</li>
        </ul>
        <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            Installation
        </h3>
        <ol>
            <li>
                Clone the repository:
                <pre><code>git clone https://github.com/Glorfindel31/vietclimb-grad-map.git</code></pre>
            </li>
            <li>
                Navigate to the project directory:
                <pre><code>cd vietclimb-grad-map</code></pre>
            </li>
            <li>
                Install the dependencies:
                <pre><code>npm install</code></pre>
            </li>
            <li>
                Start the development server:
                <pre><code>npm run dev</code></pre>
            </li>
        </ol>
        <h2
            class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Usage
        </h2>
        <p class="leading-7 [&:not(:first-child)]:mt-6">
            Once the development server is running, you can access the application by
            navigating to <code>http://localhost:3000</code> in your web browser.
        </p>
        <h2
            class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            License
        </h2>
        <p class="leading-7 [&:not(:first-child)]:mt-6">
            This project is licensed under the MIT License.
        </p>
        <h2
            class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Acknowledgments
        </h2>
        <ul class="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Shadcn and Radix for their excellent component libraries.</li>
            <li>Unovis for providing powerful chart visualization tools.</li>
            <li>Three.js for its capabilities in 3D visualization.</li>
            <li>Vercel for hosting the application.</li>
        </ul>
        <h2
            class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Contact
        </h2>
        <p class="leading-7 [&:not(:first-child)]:mt-6">
            If you have any questions or suggestions, feel free to reach out.
        </p>
        <h2
            class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Future Plans
        </h2>
        <ul class="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Integration of Three.js for a 3D map of the gym.</li>
            <li>
                Additional features to enhance the user experience and data visualization.
            </li>
            <li>Link to our instagram for beta videos.</li>
        </ul>
        <h2
            class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            URL
        </h2>
        <p class="leading-7 [&:not(:first-child)]:mt-6">
            <a
                class="font-medium text-primary underline underline-offset-4"
                href="https://vietclimb-grad-map.vercel.app/"
                >https://vietclimb-grad-map.vercel.app/</a
            >
        </p>
    </div>
</template>
