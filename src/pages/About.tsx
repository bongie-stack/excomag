import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Target, Users, Globe, Lightbulb, MessageSquare } from "lucide-react";
import africanDiversity from "@/assets/african-diversity.jpg";
import africanInnovation from "@/assets/african-innovation.jpg";
import africanHeritage from "@/assets/african-heritage-business.jpg";

const About = () => {
  const categories = [
    {
      name: "Growth & Strategy",
      icon: TrendingUp,
      description: "Strategic insights and growth tactics for emerging businesses"
    },
    {
      name: "Funding & Finance", 
      icon: Target,
      description: "Investment opportunities, funding strategies, and financial planning"
    },
    {
      name: "Tools & Tech",
      icon: Lightbulb,
      description: "Latest technologies and digital tools for African entrepreneurs"
    },
    {
      name: "Policy & Ecosystem",
      icon: Globe,
      description: "Business environment, regulations, and ecosystem developments"
    },
    {
      name: "Emerging Trailblazers",
      icon: Users,
      description: "Profiles of innovative entrepreneurs and rising business leaders"
    },
    {
      name: "Voices & Opinions",
      icon: MessageSquare,
      description: "Expert perspectives and thought leadership from industry leaders"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="hero-gradient text-transparent bg-clip-text mb-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              EXCOMAG.
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A digital-first business media platform spotlighting Africa's most promising emerging businesses
          </p>
          
          <div className="mt-12 rounded-lg overflow-hidden shadow-2xl">
            <img 
              src={africanDiversity} 
              alt="African cultural diversity and entrepreneurship" 
              className="w-full h-auto object-cover max-w-full"
              loading="lazy"
            />
          </div>
        </div>

        {/* About Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">ABOUT.</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">Our Story</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                ExcoMag Africa is a digital-first business media platform spotlighting the continent's most promising emerging businesses from bold startups to grassroots innovators and creative entrepreneurs.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our platform has evolved into a pan-African hub that blends powerful storytelling with actionable tools, tech, and insights for Africa's next generation of founders.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We go beyond headlines giving entrepreneurs across the continent a voice, a stage, and a toolkit to grow, connect, and lead.
              </p>
            </div>
            
            <div className="space-y-6">
              <Card className="card-shadow">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-6">Our Mission</h3>
                  <p className="text-lg text-foreground mb-4 leading-relaxed">
                    To inspire and equip Africa's emerging business leaders through storytelling, smart tools, and community.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    At ExcoMag Africa, we cover the stories, tools, and shifts shaping the future of African enterprise. Whether you're building a business from your bedroom or scaling across borders, our content is built for you — the emerging founder, the side hustler.
                  </p>
                </CardContent>
              </Card>
              
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={africanHeritage} 
                  alt="African heritage and modern business innovation" 
                  className="w-full h-auto object-cover max-w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-16 rounded-lg overflow-hidden shadow-2xl">
            <img 
              src={africanInnovation} 
              alt="African innovation and entrepreneurship ecosystem" 
              className="w-full h-auto object-cover max-w-full"
              loading="lazy"
            />
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Explore by Category.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover content tailored to your entrepreneurial journey across these key areas
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className="card-shadow hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-card p-12 rounded-lg card-shadow">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Ready to Join Africa's Entrepreneurial Movement?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Stay updated with the latest stories, insights, and tools that are shaping the future of African business.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;