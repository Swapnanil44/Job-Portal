import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { companies } from "@/data/companies";
import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion } from "@radix-ui/react-accordion";
import { faqs } from "@/data/faq";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Briefcase, Users } from "lucide-react";

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 pt-10 pb-10 sm:pb-20">
      <div
        className={`transition-all duration-1000 opacity-100 translate-y-0 flex justify-center mb-4`}
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm font-medium text-indigo-300 shadow-lg shadow-indigo-500/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          The Future of Recruiting
        </span>
      </div>
      <section className="text-center ">
        {/* <h1 className="flex flex-col items-center justify-center gradient-title font-extrabold text-4xl sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Find Your Dream Job
          <span className="flex items-center gap-2 sm:gap-6">
            and get Hired
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p> */}
        <h1 className="max-w-5xl mx-auto text-6xl sm:text-8xl font-bold tracking-tighter leading-tighter text-center mb-6">
          <span className="block text-transparent bg-clip-text bg-linear-to-b from-white to-white/40 pb-4">
            Find Your Next
          </span>
          <span className="block text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-cyan-400 animate-gradient-x pb-4">
            Big Opportunity
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 leading-relaxed">
          Join thousands of companies and candidates on the most vibrant job
          marketplace. No clutter, just connections.
        </p>
      </section>
      <div className="flex gap-6 justify-center">
        <Link to={"/jobs"}>
          <Button className="h-14 sm:h-16 rounded-md px-10 sm:px-14 text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40">
            Find Jobs
          </Button>
        </Link>
        <Link to={"/post-job"}>
          <Button className="h-14 sm:h-16 rounded-md px-10 sm:px-14 text-lg sm:text-xl font-bold bg-transparent border border-indigo-500/30 hover:bg-indigo-500/10 text-white transition-all">
            Post a Job
          </Button>
        </Link>
      </div>
      
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full py-10"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
              <img
                src={path}
                alt={name}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      

      {/* For Job Seekers & Employers Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mx-auto w-full">
        {/* Job Seekers Card */}
        <Card className="bg-gradient-to-br from-indigo-950/50 to-indigo-900/20 border-indigo-500/30 hover:border-indigo-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-indigo-500/20 rounded-lg">
                <Briefcase className="h-6 w-6 text-indigo-400" />
              </div>
              <CardTitle className="font-bold text-xl text-white">For Job Seekers</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-slate-300 leading-relaxed">
            <p className="mb-4">
              Explore thousands of exciting opportunities tailored to your skills and career goals.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                Search and filter by role, company, and location
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                One-click applications with profile insights
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                Track your applications in real-time
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Employers Card */}
        <Card className="bg-gradient-to-br from-purple-950/50 to-purple-900/20 border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <CardTitle className="font-bold text-xl text-white">For Employers</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-slate-300 leading-relaxed">
            <p className="mb-4">
              Build your dream team with access to pre-vetted candidates and advanced hiring tools.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                Post jobs and reach qualified candidates instantly
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                Manage applications and collaborations seamlessly
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                Advanced analytics and hiring insights
              </li>
            </ul>
          </CardContent>
        </Card>
        {/* Employers Card */}
        <Card className="bg-gradient-to-br from-cyan-950/50 to-cyan-900/20 border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-cyan-500/20 rounded-lg">
                <Users className="h-6 w-6 text-cyan-400" />
              </div>
              <CardTitle className="font-bold text-xl text-white">Smart Matching</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-slate-300 leading-relaxed">
            <p className="mb-4">
              Let our AI algorithms do the heavy lifting to find the perfect culture and skill fit.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                AI-driven salary insights
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                Resume parsing & scoring
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                Skill gap analysis & suggestions
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>


      <Accordion type="multiple" className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
};

export default LandingPage;
