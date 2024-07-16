interface TeamMemberProps {
  name: string;
  role: string;
  photoUrl: string;
  description: string;
  linkedin: string;
  github: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  role,
  photoUrl,
  description,
  linkedin,
  github,
}) => {
  return (
    <div className="w-full flex flex-row items-center justify-between bg-secondary shadow-lg rounded-lg overflow-hidden">
      <img className="w-1/2 h-auto" src={photoUrl} alt={name} />
      <div className="flex flex-col justify-center p-4">
        <div className="font-bold text-xl text-foreground">{name}</div>
        <p className="text-base mb-2 text-foreground">{role}</p>
        <p className="text-sm text-foreground">{description}</p>
        <div className="flex gap-4 mt-4">
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <img src="/icons/linkedin.svg" alt="LinkedIn" />
          </a>
          <a href={github} target="_blank" rel="noopener noreferrer">
            <img src="/icons/github.svg" alt="Github" />
          </a>
        </div>
      </div>
    </div>
  );
};

const myDetails = {
  name: "Ved Bhanushali",
  role: "Software Developer",
  photoUrl: "/images/profile.jpg",
  description:
    "Specializes in full stack development with expertise in building and maintaining web applications.",
  linkedin: "https://www.linkedin.com/in/ved-k-bhanushali/",
  github: "https://github.com/Vedbhanushali",
};

export default function AboutMe() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl text-foreground font-bold">About Me</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="w-full md:w-3/4 lg:w-3/4">
          <TeamMember key={myDetails.name} {...myDetails} />
        </div>
      </div>
    </div>
  );
}
