import * as React from "react";
import "./contact.scss";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

import {
  IconPhoneCall,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandX,
  IconAt,
  IconLocation,
  IconBook2,
} from "@tabler/icons-react";

const contactOptions = [
  {
    icon: <IconPhoneCall />,
    value1: "Request Call Back",
    value2: "Just Share your number, we will back.",
    value3: "Your Number",
  },
  {
    icon: <IconPhoneCall />,
    value1: "Request Call Back",
    value2: "Just Share your number, we will back.",
    value3: "Your Number",
  },
];

const company_contact_info = [
  {
    icon: <IconPhoneCall />,
    value1: "Phone Number",
    value2: "234445686",
  },
  {
    icon: <IconLocation />,
    value1: "Address",
    value2: "22, 6th Cross Street, Basavanagudi, Bangalore, KARNATAKA, 560004",
  },
  {
    icon: <IconAt />,
    value1: "Email",
    value2: "accbook@gmail.com",
  },
];

const icon_list = [
  {
    icon: <IconBrandFacebook />,
  },
  {
    icon: <IconBrandInstagram />,
  },
  {
    icon: <IconBrandYoutube />,
  },
  {
    icon: <IconBrandLinkedin />,
  },
  {
    icon: <IconBrandX />,
  },
];

const form_label = [
  {
    label: "Name",
  },
  {
    label: "Email",
  },
  {
    label: "Phone",
  },
];

export default function Contact() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <div className="contact-us-wrapper">
        <div className="contact-us-navbar-wraperr">
          <div className="left flex items-center">
            <IconBook2 className="text-[#008cff] h-16 w-16" />
            <div className="text-[50px] text-[#008cff]">
              Acc<span className="font-bold text-[37px] text-[#eeb405] uppercase">Book</span>
            </div>
          </div>
          <div className="links">
            <Link to="/home">
              <div>
                <p>Home</p>
              </div>
            </Link>
            <Link to="/Login">
              <div>
                <p>Log In</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="contact-us-heading">
          <div className="contact-us-heading-section">
            <p>Need any help? </p>
            <h1>Contact us!</h1>
          </div>
        </div>

        <div className="main-section">
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} className="section-wrapper">
              <Item>
                <div>
                  <div className="section-text">
                    <h1 className=" text-start ">
                      <span className=" text-sky-600">Connecting</span> World
                      for <br />
                      Better Solving
                    </h1>
                    <p className=" text-start">
                      Occasionally circumstances occur in which toil and pain
                      can procure him some great.
                    </p>
                  </div>

                  <div className="contact-us-card-section">
                    <Grid container spacing={2}>
                      {contactOptions.map((item, index) => (
                        <Grid
                          item
                          xs={12}
                          md={6}
                          key={index}
                          className="contact-us-card"
                        >
                          <div className="inner-box">
                            <Item>
                              <div className="card-section ">
                                <div className="card-icon text-sky-600">
                                  {item.icon}
                                </div>
                                <div className="card-content">
                                  <h4>{item.value1}</h4>
                                  <p>{item.value2}</p>
                                  <p>{item.value3}</p>
                                </div>
                              </div>
                            </Item>
                          </div>
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                </div>
              </Item>
            </Grid>

            <Grid item xs={12} md={4} className="right-section">
              <Item>
                <div className="right-wrapper">
                  <div className="company-details-wrapper">
                    <h4 className="text-start text-slate-100">Contact Info</h4>
                    <div className="inner-section">
                      {company_contact_info.map((item, index) => {
                        return (
                          <div className="flex card-sec" key={index}>
                            <div className="company-details-icon-wrapper text-start">
                              {item.icon}
                            </div>
                            <div className="company-details-text text-start">
                              <h2>{item.value1}</h2>
                              <p className=" font-medium">{item.value2}</p>
                            </div>
                          </div>
                        );
                      })}

                      <div className="social-media-card-icons text-start">
                        <div className="inside-sec-card">
                          <div>
                            {icon_list.map((item, index) => (
                              <a href="#" key={index}>
                                {item.icon}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="google-map-link-wrapper">
                        <div className="google-map-link">
                          <a href="#" className="w-full">
                            View On Google Map
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Item>
            </Grid>
          </Grid>
        </div>

        <div className="form-section">
          <div className="form-section-wrapper">
            <div className="section-heading">
              <p className=" text-start">Drop a line</p>
              <h1>
                Send Your <span>Message to us</span>
              </h1>
            </div>
            <div className="send-us-message">
              <div className="send-us-message-wrapper">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "100%" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6} className="section-wrapper ">
                      <Item className="padding-left-zero">
                        {form_label.map((item, index) => (
                          <Box className="box-sec " key={index}>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              //size="small"
                              label={item.label}
                              className="w-full"
                              required
                            />
                          </Box>
                        ))}
                      </Item>
                    </Grid>
                    <Grid item xs={12} md={6} className="section-wrapper">
                      <Item>
                        <Box className="box-sec message-box">
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            rows={5}
                            className="w-full"
                            label="Your Message"
                            //size="small"
                            required
                            multiline
                          />
                        </Box>
                        <Box className="box-sec">
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            //size="small"
                            className="w-full"
                            label="Subject"
                            required
                          />
                        </Box>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
            <div className="send-msg-btn-wrapper">
              <button
                className="send-msg-btn"
                onSubmit={(e) => e.preventDefault()}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
