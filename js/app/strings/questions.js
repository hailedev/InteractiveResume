/**
 * Created with JetBrains WebStorm.
 * User: Hai
 * Date: 1/03/15
 * Time: 1:15 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    'app/strings/questions',
    [],
    function(){
        return [
            {
                question: "<p style=\"font-weight:bold;\">What qualities can you offer our organisation?</p>",
                response: "<p style=\"font-size:14px;line-height:20px\">I see my greatest strengths are my commitment to self improvement, breadth of technical knowledge and my ability to work independently.  I'm always looking to improve my technical skills in some way, I actually really enjoy it, I like learning new things.  <br/><br/>This is evident from my academic and professional qualifications, all of which were acquired at my own accord.  In my current role I have had to learn many new technologies for various projects including RESTful architecture, MVVM and dependency injection just to name a few.  Most of which were learned independently and in my own time.  <br/><br/>This has led me to build up a wide technical toolkit in order to identify the best approaches to solving difficult problems.</p>"
            },
            {
                question: "<p style=\"font-weight:bold;\">Name a successful project you have worked on, what was your contribution?</p>",
                response: "<p style=\"font-size:14px;line-height:20px\">One of our more successful product features that we have recently introduced is a tool to extract data from social media sources including Twitter, Facebook, SurveyMonkey and LinkedIn.  The data is then imported into the core product where it can be analyzed and modeled.  <br/><br/>The implementation of this feature involved invocation of each data sources RESTful web services and their various flavors of OAuth authentication, it involved the development of two seperate browser extensions, a .Net C# version used in Internet Explorer and a Javascript version for Chrome.  <br/><br/>I was a key contributor in which I was a member of the team that was tasked with implementation of the API bindings along with the development of the supporting OAuth workflow, it required research into each of these API's, the various resources available to us in both .Net and Javascript and the security implications of accessing each service.  <br/><br/>I also helped implement the continuous integration build process including execution of unit tests, minification and deployment.  This feature has become very popular amongst our users and is something which I am very proud of. </p>"
            },
            {
                question: "<p style=\"font-weight:bold;\">Describe a project that you are least proud of, what would you do differently?</p>",
                response: "<p style=\"font-size:14px;line-height:20px\">I recently worked on a feature that integrated with a third party WCF service.  The feature initially enabled users to upload media content into cloud storage, an external service would then produce a transcription of the media.  Once transcribed, our application would then consume the WCF service by polling the ready state of the transcription, downloading the file and then integrating it into our application.  <br/><br/>Although the feature met the required objectives, I felt that there was a breakdown in communication on a number of fronts and as a result the feature was not completed in the agreed timeframes.  The API provided by the third party was not in a complete state at the time estimates were provided.  This resulted in development of the client and service occuring in parrallel and at times it was unclear if one was driving the other, the API ended considerably different to when it was first proposed, which had a major impact on delivery.  <br/><br/>I felt that most of the issues related to the development of this feature occurred at the planning phase.  We did not thoroughly research the provider and query the state of development of their service.  We failed to gauge their completion timeframes and determine how this would effect the project.  These are things which we failed to consider and something we would do differently. </p>"
            },
            {
                question: "<p style=\"font-weight:bold;\">What are your hobbies?</p>",
                response: "<p style=\"font-size:14px;line-height:20px\">I enjoy travelling more than anything else, in particular to unique places with different cultures.  I have traversed South America and have travelled to the Middle East crossing through Egypt, Jordan and Syria.  In 2014 I participated in UNICEF Kilimanjaro Climb for Kids, I was part of a team of 25 that climbed Mt Kilimanjaro in an attempt to raise money for UNICEF's Mobile Health Nutrition Team's.  We have raised over $100,000 and it is one of the proudest things I have done. </p>"
            },
            {
                question: "<p style=\"font-weight:bold;\"></p>",
                response: "<p style=\"font-size:14px;line-height:20px\">Thank you so much for taking the time to read/play through my application.  <br/>If you would like to get in touch with me, you can do so through this link <a href=\"http://haile.info/contact\" target=\"_blank\">here</a> " +
                    "or feel free to use one of my social media links.  I hope to speak to you soon.<br/><br/>" +
                    "You can also access my full resume and work history using the links above.</p>"
            }
        ];
    }
);