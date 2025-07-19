import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Users, 
  Target, 
  Zap,
  Star,
  HandHeart,
  Building2,
  Eye,
  Smartphone,
  Rocket,
  Shield
} from 'lucide-react';
import Card from '../components/ui/Card';
import img0 from "../images/pic1.jpg";
import img1 from "../images/pic2.jpg";
import img3 from "../images/pic5.jpg";
import img4 from "../images/pic6.jpg";
import img5 from "../images/pic3.jpg";
import { Github, Linkedin, Mail } from "lucide-react";
import team1 from "../images/team1.jpg";
import team2 from "../images/team2.jpg";
import team3 from "../images/team3.jpg";


const About = () => {
  const indianChallenges = [
  {
    title: "Food Waste in India",
    value: "67 Million Tons",
    description: "Food wasted annually in India - enough to feed 200 million people",
    image: img4,
    color: "text-red-600",
    bgColor: "bg-red-100",
    borderColor: "border-red-300"
  },
  {
    title: "Hunger Crisis",
    value: "224 Million",
    description: "Indians face hunger daily while tons of food go to waste",
    image: img3,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    borderColor: "border-orange-300"
  },
  {
    title: "Malnutrition Among Children",
    value: "35% Under Age 5",
    description: "Nearly 35% of children under age 5 in India are stunted due to poor nutrition (NFHS-5)",
    image: img0,
    color: "text-green-600",
    bgColor: "bg-green-100",
    borderColor: "border-green-300"
  }
];

  const testimonials = [
    {
      name: "Sanjana Mehta",
      role: "Volunteer Coordinator, Helping Hands NGO",
      content: "We often struggled to find timely food donations for the communities we support. But since using RescueBites, things have changed. It's not just an app — it's a powerful tool for impact.",
      initials: "SM",
      avatarColor: "bg-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      name: "Versha Gautam",
      role: "Donor",
      content: "Working on RescueBites has been a transformative journey—not just in terms of coding and technical growth, but in understanding how technology can truly make a social impact.",
      initials: "VG",
      avatarColor: "bg-orange-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      name: "Riddhi_sahu",
      role: "Donor",
      content: "This platform tackles two of society's pressing issues—food wastage and hunger—by building an efficient, real-time bridge between surplus food providers and those in need.😊😊",
      initials: "RS",
      avatarColor: "bg-yellow-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    }
  ];

  const groundRealities = [
    {
      title: "Daily Struggle for Food",
      image: img1,
      description: "Families searching for their next meal in urban areas"
    },
    {
      title: "Street Life Reality",
      image: img3,
      description: "Homeless individuals seeking shelter and sustenance"
    },
    {
      title: "Community Kitchens",
      image: img5,
      description: "Shared meals bringing hope to struggling families"
    },
    {
  title: "School Children Without Midday Meals",
  image: img4,
  description: "Millions of children depend on school meals — disruptions leave many hungry"
}

  ];

  const futureFeatures = [
    {
      icon: Smartphone,
      title: "Smart Mobile App",
      description: "AI-powered notifications and real-time matching for instant food rescue",
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-200"
    },
    {
      icon: Shield,
      title: "Corporate Partnerships",
      description: "Collaboration with restaurants, hotels, and food companies for systematic waste reduction",
      color: "text-orange-500",
      bgColor: "bg-orange-100",
      borderColor: "border-orange-200"
    },
    {
      icon: Rocket,
      title: "Community Rewards",
      description: "Gamification and recognition system to encourage sustainable donation habits",
      color: "text-red-500",
      bgColor: "bg-red-100",
      borderColor: "border-red-200"
    }
  ];

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Hero Section - What We Are */}
      <section className="bg-orange-50 py-20 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-96 h-96 bg-yellow-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-red-200 rounded-full opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center bg-white px-6 py-3 rounded-full shadow-sm mb-8">
              <Heart className="w-5 h-5 text-red-500 mr-2" />
              <span className="font-medium text-gray-700">About RescueBites</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              We Are{' '}
              <span className="text-orange-500">
                RescueBites
              </span>
            </h1>
            <p className="text-2xl md:text-3xl mb-12 max-w-4xl mx-auto font-light text-gray-600 leading-relaxed">
              From overflowing plates to empty hands, we weave a chain of compassion—feeding hearts, restoring dignity, and nourishing millions across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* NEW: Ground Reality Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-red-100 px-6 py-3 rounded-full mb-8">
              <Eye className="w-5 h-5 text-red-600 mr-2" />
              <span className="font-medium text-red-700">Ground Reality</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              The Reality We <span className="text-red-500">Witness</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Every day, millions of Indians face the harsh reality of hunger and poverty. These are their stories.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {groundRealities.map((reality, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="overflow-hidden h-full hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                  <div className="relative h-48">
                    <img
                      src={reality.image}
                      alt={reality.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{reality.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{reality.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-red-100 px-6 py-3 rounded-full mb-8">
              <Target className="w-5 h-5 text-red-600 mr-2" />
              <span className="font-medium text-red-700">The Challenge</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              The Challenge in India
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Despite abundant resources, millions of Indians lack access to basic food and clean water
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {indianChallenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`overflow-hidden hover:shadow-xl transition-all duration-300 rounded-3xl bg-white border-2 ${challenge.borderColor}`}>
                  <div className="h-48">
                    <img
                      src={challenge.image}
                      alt={challenge.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`p-8 ${challenge.bgColor}`}>
                    <div className={`text-4xl font-bold mb-3 ${challenge.color} text-center`}>{challenge.value}</div>
                    <div className="text-xl font-semibold text-gray-900 mb-4 text-center">{challenge.title}</div>
                    <p className="text-gray-700 leading-relaxed text-center">{challenge.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-orange-100 px-6 py-3 rounded-full mb-8">
              <Zap className="w-5 h-5 text-orange-600 mr-2" />
              <span className="font-medium text-orange-700">What We Do</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We connect generous donors with NGOs, communities, and individuals in need of food and water
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: HandHeart, title: "Donate", desc: "Share surplus food with those in need", color: "text-red-500", bgColor: "bg-red-100" },
              { icon: Users, title: "Request", desc: "Connect individuals and families with available resources", color: "text-orange-500", bgColor: "bg-orange-100" },
              { icon: Building2, title: "Support NGOs", desc: "Help organizations distribute aid efficiently", color: "text-yellow-500", bgColor: "bg-yellow-100" },
              { icon: Heart, title: "Build Community", desc: "Strengthen neighborhoods through giving", color: "text-green-500", bgColor: "bg-green-100" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`p-8 text-center hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-gray-200 rounded-3xl bg-white`}>
                  <div className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-yellow-100 px-6 py-3 rounded-full mb-8">
              <Star className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="font-medium text-yellow-700">Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              Stories of Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Hear from donors, NGOs, and volunteers who are making a difference through RescueBites
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`p-8 hover:shadow-xl transition-all duration-300 rounded-3xl border-2 ${testimonial.borderColor} ${testimonial.bgColor}`}>
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 rounded-2xl ${testimonial.avatarColor} flex items-center justify-center mr-4 border-2 border-white shadow-md`}>
                      <span className="text-white font-bold text-lg">{testimonial.initials}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                      <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-800 italic leading-relaxed font-medium">"{testimonial.content}"</p>
                  <div className="flex mt-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Additions */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-orange-100 px-6 py-3 rounded-full mb-8">
              <Rocket className="w-5 h-5 text-orange-600 mr-2" />
              <span className="font-medium text-orange-700">Future Additions</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              The Future of <span className="text-orange-500">Food Rescue</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Innovation never stops. We're constantly evolving RescueBites to create a more connected, efficient, and impactful platform for social change.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {futureFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className={`p-8 hover:shadow-2xl transition-all duration-500 rounded-3xl bg-white border-2 ${feature.borderColor} group-hover:scale-105 group-hover:-translate-y-2`}>
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-orange-500 group-hover:text-orange-700 transition-colors duration-300">Coming Soon</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
<section className="py-24 bg-orange-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <div className="inline-flex items-center bg-orange-100 px-6 py-3 rounded-full mb-8">
        <Users className="w-5 h-5 text-orange-600 mr-2" />
        <span className="font-medium text-orange-700">Meet Our Team</span>
      </div>
      <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
        Passionate <span className="text-orange-500">Change-Makers</span>
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Our team is dedicated to bridging the gap between food waste and hunger with compassion and code.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {[{
        name: "Anubhooti Pandey",
        role: "Lead Code Architect & Backend Developer",
        image: team1,
        bio: "Handles complex logic, APIs and data flow with precision and backend efficiency.",
        github: "https://github.com/anubhootipandey",
        linkedin: "www.linkedin.com/in/anubhooti-pandey-418063228",
        email: "mailto:anubhooti5work@gmail.com"
      },
      {
        name: "Versha Gautam",
        role: "Lead Frontend Developer & UI Systems Engineer",
        image: team2,
        bio: "Designs intuitive UIs and builds seamless user experiences with ReactJS and TailwindCSS.",
        github: "https://github.com/Versha108",
        linkedin: "https://www.linkedin.com/in/versha-gautam-a33064228/",
        email: "mailto:gversha20@gmail.com"
      },
      {
        name: "Riddhi Sahu",
        role: "Support Lead & Documentation Curator",
        image: team3,
        bio: "Researches deeply and crafts clear documentation to guide decisions and improve user understanding.",
        github: "https://github.com/Riddhi-Sahu",
        linkedin: "https://www.linkedin.com/in/riddhi-sahu-330062228/",
        email: "mailto:sahuriddhi0987@gmail.com"
      }
      ].map((member, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 text-center p-6">
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-orange-200"
            />
            <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
            <p className="text-orange-600 text-[13px] mb-3">{member.role}</p>
            <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
            <div className="flex justify-center gap-4 mt-2">
              <a href={member.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 text-gray-700 hover:text-black transition" />
              </a>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5 text-blue-700 hover:text-blue-800 transition" />
              </a>
              <a href={member.email}>
                <Mail className="w-5 h-5 text-red-600 hover:text-red-700 transition" />
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

    </div>
  );
};

export default About;