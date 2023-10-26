import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom'
import "./home.scss";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconReportAnalytics,
  IconArrowBadgeRightFilled,
  IconBrandYoutube,
  IconBrandX,
  IconMapPins,
  IconMessage2,
  IconBook2,
} from "@tabler/icons-react";
import Faq from "../../components/homepage/faq/Faq.jsx";

export default function Home() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));


  const questions = [
    {
      id: 1,
      question: "Popular Articles",
      answer:
        "Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.",
    },
    {
      id: 2,
      question: "Fix problems & request removals",
      answer:
        "Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.",
    },
    {
      id: 3,
      question: "Browse the web",
      answer:
        "Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.",
    },
    {
      id: 4,
      question: "Search on your phone or tablet",
      answer:
        "Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.",
    },
  ];

 
  return (
    <>

      <div className="homepage-main ">
        <div className="homepage-main-section">
          <div className="navbar-wraperr">
          <div className="left flex items-center">
            <IconBook2 className=" h-16 w-16" />
            <div className="text-[50px] ">
              Acc<span className="font-bold text-[37px] uppercase">Book</span>
            </div>
          </div>
            <div className="links gap-6">
              <Link to="/contact">
                <p className="text-xl">Contact Us</p>
              </Link>
              <Link to="/Login"> 
              <div>
                <p className="text-xl">Log In</p>
              </div>
              </Link>
            </div>
          </div>

          <div className="section">
            <div className="section-wrapper">
              <div className="home-page-heading">
                <h1>
                  Smart Solution For Business, Helps businesses like yours to
                  achieve long-term success.
                </h1>
                <h4>
                  With our user-friendly interface and expert market analysis,
                  you'll be earning more in no time.
                </h4>
              </div>
              <div>
                <Link to="/register">                
                <p className="read-more ">
                  <div className="btn-wrapper">
                    <span>Open Account Now</span>
                    <IconArrowBadgeRightFilled className="arrow-icon" />
                  </div>
                </p>
                </Link>
                <Link  to="/">                
                <p className="read-more">
                  <div className="btn-wrapper">
                    <span>Demo Account</span>
                    <IconArrowBadgeRightFilled className="arrow-icon" />
                  </div>
                </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
                <Box className="footer-section" sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={3} className="sec-1 sec bg-inherit shadow-inherit">
                      <Item className=" bg-inherit shadow-inherit">
                        <div className="main-heading">
                          <h1>
                            Open Your <br />
                            Account Now
                          </h1>
                        </div>
                      </Item>
                    </Grid>
                    <Grid item xs={12} md={3} className="sec-2 sec">
                      <Item className="inside-sec">
                        <div>
                          <h1>Create Profile</h1>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ut elit
                          </p>
                        </div>
                      </Item>
                    </Grid>
                    <Grid item xs={12} md={3} className="sec-3 sec">
                      <Item className="inside-sec">
                        <div>
                          <h1>Open Business Account</h1>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ut elit
                          </p>
                        </div>
                      </Item>
                    </Grid>
                    <Grid item xs={12} md={3} className="sec-4 sec">
                      <Item className="inside-sec">
                        <div>
                          <h1>Get Started</h1>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ut elit
                          </p>
                        </div>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </div>
      <div className="features-section">
        <div className="features">
          <Box className="section-1">
            <Grid container spacing={2}>
              <Grid item xs={6} md={8} className="sec-1-1">
                <Item>
                  <div>
                    <h1>
                      Choose our <span> world-class platform</span>
                    </h1>
                    <p>
                      We're constantly improving our trading platform, trying to
                      make it the best on the market
                    </p>
                  </div>
                </Item>
              </Grid>
              <Grid item xs={12} md={4} className="sec-1-2">
                <Item>
                  <a href="#" className="read-more">
                    <div className="btn-wrapper">
                      <span>Get Started</span>
                      <IconArrowBadgeRightFilled className="arrow-icon" />
                    </div>
                  </a>
                </Item>
              </Grid>
            </Grid>
          </Box>
          <Box className="section-2" sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3} className="sec-2-1">
                <Item>
                  <div>
                    <div className="icon">
                      <span className="inside-icon">
                        <IconReportAnalytics size={40} />
                      </span>
                    </div>
                    <p>
                      Sales and purchase accounting Sales and purchase
                      accounting
                    </p>
                  </div>
                </Item>
              </Grid>
              <Grid item xs={12} md={3} className="sec-2-2 ">
                <Item>
                  <div>
                    <div className="icon">
                      <span className="inside-icon">
                        <IconReportAnalytics size={40} />
                      </span>
                    </div>
                    <p>
                      GST/Non-GST bill creation Sales and purchase accounting
                    </p>
                  </div>
                </Item>
              </Grid>
              <Grid item xs={12} md={3} className="sec-2-3">
                <Item>
                  <div>
                    <div className="icon">
                      <span className="inside-icon">
                        <IconReportAnalytics size={40} />
                      </span>
                    </div>
                    <p>
                      Stock management with profit tracking Sales and purchase
                      accounting
                    </p>
                  </div>
                </Item>
              </Grid>
              <Grid item xs={12} md={3} className="sec-2-4">
                <Item>
                  <div>
                    <div className="icon">
                      <span className="inside-icon">
                        <IconReportAnalytics size={40} />
                      </span>
                    </div>
                    <p>
                      Stock management with profit tracking Sales and purchase
                      accounting
                    </p>
                  </div>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
      <div className="why-accbook">
        <Box className="why-accbook-section" sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4} className="sec-2 sec">
              <Item className="sec-content">
                <Card sx={{ maxWidth: 310 }}>
                  <div className="img-wrappper">
                    <CardMedia
                      sx={{ height: 210 }}
                      image="https://jan.coderdemo.com/newwp/bullion/wp-content/uploads/2023/03/market-3.jpg"
                      title="green iguana"
                      className="inside-img-wrapper"
                    />
                  </div>
                  <CardContent className="">
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="hidden-heading"
                    >
                      GST compliance
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <p>
                        Create GST invoices, know your tax liability, and file
                        your tax returns directly. AccBook keeps your business
                        GST compliant.
                      </p>
                    </Typography>
                  </CardContent>
                </Card>
                <div className="home-page-heading">
                  <p>GST compliance</p>
                </div>
              </Item>
            </Grid>
            <Grid item xs={12} md={4} className="sec-2 sec">
              <Item className="sec-content">
                <Card sx={{ maxWidth: 310 }}>
                  <div className="img-wrappper">
                    <CardMedia
                      sx={{ height: 210 }}
                      image="https://jan.coderdemo.com/newwp/bullion/wp-content/uploads/2023/03/market-3.jpg"
                      title="green iguana"
                      className="inside-img-wrapper"
                    />
                  </div>
                  <CardContent className="">
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="hidden-heading"
                    >
                      GST compliance
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <p>
                        Create GST invoices, know your tax liability, and file
                        your tax returns directly. AccBook keeps your business
                        GST compliant.
                      </p>
                    </Typography>
                  </CardContent>
                </Card>
                <div className="bg-img"></div>
                <div className="home-page-heading">
                  <p>GST compliance</p>
                </div>
              </Item>
            </Grid>
            <Grid item xs={12} md={4} className="sec-2 sec">
              <Item className="sec-content">
                <Card sx={{ maxWidth: 310 }}>
                  <div className="img-wrappper">
                    <CardMedia
                      sx={{ height: 210 }}
                      image="https://jan.coderdemo.com/newwp/bullion/wp-content/uploads/2023/03/market-3.jpg"
                      title="green iguana"
                      className="inside-img-wrapper"
                    />
                  </div>
                  <CardContent className="">
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="hidden-heading"
                    >
                      GST compliance
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <p>
                        Create GST invoices, know your tax liability, and file
                        your tax returns directly. AccBook keeps your business
                        GST compliant.
                      </p>
                    </Typography>
                  </CardContent>
                </Card>
                <div className="bg-img"></div>
                <div className="home-page-heading">
                  <p>GST compliance</p>
                </div>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>
      {/* ###################  services-wrapper   ########################### */}
      <div className="services-wrapper" id="services-wrapper">
        <div className="shape-1">
          <div className="inside-shape"></div>
        </div>
        <div className="section">
          <div className="sec-1">
            <div>
              <h1>
                Powerful <span>features to help you</span>
              </h1>
            </div>
            <div>
              <p>
                A product roadmap shows the path ahead, helps teams plan, and
                guides the delivery of the product.
              </p>
            </div>
          </div>
          <div className="sec-2">
            <Box className="sec-2-1" sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} className="sec-2-1-a">
                  <Item></Item>
                </Grid>
                <Grid item xs={12} md={6} className="sec-2-1-b">
                  <Item>
                    <div className="sec-card">
                      <div className="inside-sec-card">
                        <h1>Business management</h1>
                        <p>
                          Data synced across mobile and desktop devices. Use
                          Khatabook in both online and offline mode (Coming
                          Soon)
                        </p>
                      </div>
                    </div>
                  </Item>
                </Grid>
              </Grid>
            </Box>
            <Box className="sec-2-1" sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} className="sec-2-1-a">
                  <Item>
                    <div className="sec-card">
                      <div className="inside-sec-card">
                        <h1>Business management</h1>
                        <p>
                          Data synced across mobile and desktop devices. Use
                          Khatabook in both online and offline mode (Coming
                          Soon)
                        </p>
                      </div>
                    </div>
                  </Item>
                </Grid>
                <Grid item xs={12} md={6} className="sec-2-1-b">
                  <Item></Item>
                </Grid>
              </Grid>
            </Box>
            <Box className="sec-2-1" sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} className="sec-2-1-a">
                  <Item></Item>
                </Grid>
                <Grid item xs={12} md={6} className="sec-2-1-b">
                  <Item>
                    <div className="sec-card">
                      <div className="inside-sec-card">
                        <h1>Business management</h1>
                        <p>
                          Data synced across mobile and desktop devices. Use
                          Khatabook in both online and offline mode (Coming
                          Soon)
                        </p>
                      </div>
                    </div>
                  </Item>
                </Grid>
              </Grid>
            </Box>
            <Box className="sec-2-1" sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} className="sec-2-1-a">
                  <Item>
                    <div className="sec-card">
                      <div className="inside-sec-card">
                        <h1>Business management</h1>
                        <p>
                          Data synced across mobile and desktop devices. Use
                          Khatabook in both online and offline mode (Coming
                          Soon)
                        </p>
                      </div>
                    </div>
                  </Item>
                </Grid>
                <Grid item xs={12} md={6} className="sec-2-1-b">
                  <Item></Item>
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>
      </div>

      {/* ###################  website for diff businesses    ########################### */}

      <div className="businessTypeWrapper ">
        <div className="businessTypeSection">
          <Box className="secT" sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} className="secT-1">
                <Item>
                  <div className="secT-card">
                    <div className="inside-secT-card">
                      <img
                        width={275}
                        height={183}
                        src="https://www.sba.gov/size-standards/img/size-standards-ruler-business.png"
                      />
                      <h1>Small-sized businesses</h1>
                      <p>
                        The burden of managing finances can stop a small
                        business in its tracks that’s where Partner comes in.
                        The burden of managing finances can stop a small
                        business in its tracks that’s where Partner comes in.
                      </p>
                    </div>
                  </div>
                </Item>
              </Grid>

              <Grid item xs={12} md={6} className="secT-1">
                <Item>
                  <div className="secT-card">
                    <div className="inside-secT-card">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXu8nyT8MQgLjf13Axa1pt6yfq3Ozbtu6woo3IHXT5_MjioHIjMLeNfisTEnOF6lAOJ_Q&usqp=CAU" />
                      <h1>Medium-sized businesses</h1>
                      <p>
                        The burden of managing finances can stop a small
                        business in its tracks that’s where Partner comes in.
                        The burden of managing finances can stop a small
                        business in its tracks that’s where Partner comes in.
                      </p>
                    </div>
                  </div>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>

      {/* ################### Faq ########################### */}
      <div className="faq-wrapper">
        <Box className="faq-section" sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} className="sec-1">
              <Item>
                <Faq data={questions} />
              </Item>
            </Grid>

            <Grid item xs={12} md={6} className="sec-2">
              <Item>
                <img src="https://oosys.ca/wp-content/uploads/elementor/thumbs/web-to-print-faq-q5lxubc05jdal82udef4ag94zeel5r2bsaily7wq54.png" />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>

      {/* ################### Footer ########################### */}
      <div className="page-footer">
        <div className="sec-card">
          <div className="inside-sec-card">
            <div>
              <h1>AccBook</h1>
            </div>
            <div className="address">
              <div>
                <IconMapPins className="f-icon" size={40} />
              </div>
              <div>
                A108 Adam Street <br />
                New York, NY 535022 United States <br />
              </div>
            </div>
            <div className="contact">
              <div>
                <IconMessage2 className="f-icon" size={40} />
              </div>
              <div>
                +1 5589 55488 55
                <br />
                info@example.com
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="sec-card">
          <div className="inside-sec-card-1">
            {/*<h3>Our Social Networks</h3>*/}
            <div>
              <a href="#">
                <IconBrandFacebook />
              </a>
              <a href="#">
                <IconBrandInstagram />
              </a>
              <a href="#">
                <IconBrandYoutube />
              </a>
              <a href="#">
                <IconBrandLinkedin />
              </a>
              <a href="#">
                <IconBrandX />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
