"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Wrapper from "../wrapper/wrapper";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";


import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";

import firebaseConfig from "../../../firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);


const formSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  name: z.string().min(2, {
    message: "Name is required",
  }),
  sport: z.string().min(2, {
    message: "Sport is required",
  }),
  message: z
    .string()
    .min(10, {
      message: "Message must be at least 10 characters.",
    })
    .max(300, {
      message: "Message must not be longer than 300 characters.",
    }),
});

const ContactSection = () => {
  const [contactImage, setContactImage] = useState<string>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      sport: "",
      message: "",
    },
  });

  useEffect(() => {
    const userUid = 'OYb1VwaGzAdADogvJkvz3GZ6l0g1';
    const pageDataRef = ref(db, `adminData/${userUid}`);

    const unsubscribe = onValue(pageDataRef, (snapshot) => {
      const data = snapshot.val();
      // console.log("data_______", data.players[0]);
      if (data) {
        setContactImage(data.contact_us.imageUrl);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("____________here___________", values);
    try {
      const response = await axios.post('http://localhost:5000/send-email', values);
      if (response.status === 200) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
    
  };


  const sectionRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  });

  const handleIntersection = (entries: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        controls.start({
          x: 0,
          opacity: 1,
          transition: {
            duration: 1.2,
            delay: 0.2,
          },
        });
      }
    });
  };

  return (
    <div ref={sectionRef} className="md:mt-20">
      <div id="contact" className="h-0 md:h-20" />
      <Wrapper>
        <div className="w-full md:px-20">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 md:gap-10 md:h-[53rem]">
            <div className="w-full flex flex-col items-start gap-4 h-full">
              <div className="h-fit border border-[#131E42] rounded-xl px-4 md:px-8 w-full py-6 md:py-14">
                <div className=" w-fit px-4 py-1 md:py-2 rounded-full border border-[#131E42] flex items-center justify-center">
                  <p className=" text-lg font-normal text-[#131E42]">
                    Fill The Form
                  </p>
                </div>
                <h2 className=" font-semibold text-3xl md:text-4xl mt-4 md:mt-6 text-[#131E42]">
                  Contact Us
                </h2>
                <p className=" font-normal text-lg md:text-xl mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,{" "}
                  <br className=" hidden md:block" /> sed do eiusmod tempor
                </p>
              </div>
              <div className="h-full border border-[#131E42] rounded-xl px-4 md:px-8 w-full py-8 md:py-12 bg-white">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      name="name"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-start justify-center space-y-4 col-span-2">
                          <FormControl>
                            <Input
                              className="px-5 w-full"
                              disabled={isLoading}
                              placeholder="Enter Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-start justify-center space-y-4 col-span-2 mt-2">
                          <FormControl>
                            <Input
                              className="px-5 w-full"
                              disabled={isLoading}
                              placeholder="Enter Email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="sport"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-start justify-center space-y-4 col-span-2 mt-2">
                          <FormControl>
                            <Input
                              className="px-5 w-full"
                              disabled={isLoading}
                              placeholder="Enter Your Sports"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="mt-2">
                          <FormControl>
                            <Textarea
                              disabled={isLoading}
                              placeholder="Enter Message"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full font-medium text-base mt-8"
                      disabled={isLoading}
                    >
                      Submit
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={controls}
              className="w-full relative h-[40rem] md:h-full rounded-2xl"
            >
            {contactImage && (
              <Image
                fill
                alt="Contact us"
                className="rounded-2xl"
                src={contactImage}
                quality={100}
              />
            )}
            </motion.div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default ContactSection;
