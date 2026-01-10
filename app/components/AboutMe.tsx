const ProfileCard = () => {
    return (
      <div className="p-8 space-y-4">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">Ayser Ahmed Bijapur</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Aspiring Software Developer | Data Science Enthusiast | Freelance - Outlier AI
            </p>
          </div>
        </div>
  
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
         Computer Engineering graduate with a strong foundation in artificial intelligence, machine learning, and software engineering.
         Hands-on experience in AI model training, evaluation, and quality analysis, along with building full-stack applications and data-driven automation tools.
         Proficient in Python, JavaScript, and TypeScript, with experience using modern frameworks, databases, and cloud-based tools.
         Actively seeking an AI Engineer role to apply machine learning, data analysis, and scalable system design to real-world problems.
        </p>

  
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Current Roles</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
            <li>Nielsen | Data Co-Ordinator |--| Outlier AI | Freelancer</li>
          </ul>
        </div>
  
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Technical Skills and Interests</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
            <li>
              <strong>Languages:</strong>
              <ul className="list-none list-inside ml-4">
                <li>→ C</li>
                <li>→ C++</li>
                <li>→ JavaScript</li>
                <li>→ TypeScript</li>
                <li>→ Java</li>
                <li>→ Python</li>
              </ul>
            </li>
            <li>
              <strong>Frameworks & Libraries:</strong>
              <ul className="list-none list-inside ml-4">
                <li>→ Node.js</li>
                <li>→ Express.js</li>
                <li>→ React.js</li>
                <li>→ Next.js</li>
                <li>→ WebSockets</li>
                <li>→ TailwindCSS</li>
              </ul>
            </li>
            <li>
              <strong>Tools:</strong>
              <ul className="list-none list-inside ml-4">
                <li>→ Git/GitHub</li>
                <li>→ Google Colab</li>
                <li>→ Docker</li>
                <li>→ AWS</li>
              </ul>
            </li>
            <li>
              <strong>Databases:</strong>
              <ul className="list-none list-inside ml-4">
                <li>→ MySQL</li>
                <li>→ PostgreSQL</li>
                <li>→ MongoDB</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default ProfileCard;
  