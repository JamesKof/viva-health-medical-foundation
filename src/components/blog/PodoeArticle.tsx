import podoeHero from "@/assets/blog/podoe-hero.jpg";
import podoeOutreach from "@/assets/blog/podoe-outreach.jpg";
import podoeDental from "@/assets/blog/podoe-dental.jpg";
import podoeEducation from "@/assets/blog/podoe-education.jpg";
import podoeLab from "@/assets/blog/podoe-lab.jpg";
import podoeCommunity from "@/assets/blog/podoe-community.jpg";

export const PodoeArticle = () => (
  <>
    <p className="text-xl font-medium text-foreground italic">
      Empowering Communities Through Preventive Healthcare
    </p>

    <p>
      <strong>Podoe, Eastern Region — Friday, 3rd April 2026</strong> — Viva Health Medical Foundation
      successfully conducted a community health outreach in Podoe, delivering free services across
      multiple health sectors. The initiative reached a total of <strong>514 individuals</strong>,
      including adolescents, adults, and the elderly, promoting preventive care, early detection,
      and overall wellness.
    </p>

    <p>
      Notably, the outreach was delivered over an intensive <strong>14-hour period</strong>,
      demonstrating strong commitment and coordination by the medical team.
    </p>

    <figure className="my-8">
      <img src={podoeHero} alt="Viva Health team at Podoe community outreach" className="rounded-xl w-full" />
      <figcaption className="text-center text-sm text-muted-foreground mt-3">
        Viva Health Medical Foundation team during the Podoe community outreach
      </figcaption>
    </figure>

    <h2>A Critical Step Toward Healthier Communities</h2>

    <p>
      Access to quality healthcare remains a challenge in many rural Ghanaian communities. Conditions
      such as hypertension, diabetes, infectious diseases, oral health issues, and vision problems
      often go undetected due to limited access to care. The Podoe outreach addressed these gaps by
      combining clinical services, laboratory testing, and health education, ensuring a holistic
      approach to community health.
    </p>

    <h2>Key Health Interventions</h2>

    <h3>1. Doctors' Consultation</h3>
    <ul>
      <li><strong>Participants attended:</strong> 514</li>
      <li><strong>Services provided:</strong> General medical consultations, diagnosis, treatment plans, and prescriptions</li>
      <li><strong>Common conditions managed:</strong> Malaria, respiratory infections, hypertension, body pains, and minor ailments</li>
      <li><strong>Impact:</strong> Provided immediate medical attention and professional guidance, ensuring proper diagnosis and treatment</li>
    </ul>

    <h3>2. Blood Pressure (BP) Screening</h3>
    <ul>
      <li><strong>Participants screened:</strong> 514</li>
      <li><strong>Elevated readings:</strong> 68 (13%)</li>
      <li><strong>Impact:</strong> Enabled early detection of hypertension and preventive interventions</li>
    </ul>

    <h3>3. Blood Sugar Screening</h3>
    <ul>
      <li><strong>Participants screened:</strong> 514</li>
      <li><strong>High readings:</strong> 54 (10.5%)</li>
      <li><strong>Impact:</strong> Promoted early identification and lifestyle management of diabetes</li>
    </ul>

    <figure className="my-8">
      <img src={podoeOutreach} alt="Health screening at Podoe outreach" className="rounded-xl w-full" />
      <figcaption className="text-center text-sm text-muted-foreground mt-3">
        Community members receiving health screenings during the outreach
      </figcaption>
    </figure>

    <h3>4. Eye Screening</h3>
    <ul>
      <li><strong>Participants screened:</strong> 150</li>
      <li><strong>Conditions identified:</strong> Refractive Error (46), Cataract (21), Glaucoma Suspects (14), Pterygium (5), Conjunctivitis (20), Allergic Eye Conditions (27), Others (7)</li>
      <li><strong>Referrals for further care:</strong> 21 (14%)</li>
      <li><strong>Impact:</strong> Improved awareness and early detection of vision-related conditions</li>
    </ul>

    <h3>5. Dental Screening &amp; Oral Health Care</h3>
    <ul>
      <li><strong>Participants screened:</strong> 95</li>
      <li><strong>Common conditions identified:</strong> Tooth decay, gum disease, oral hygiene concerns</li>
      <li><strong>Impact:</strong> Provided first-time dental access for many and reinforced preventive oral care practices</li>
    </ul>

    <figure className="my-8">
      <img src={podoeDental} alt="Dental screening at Podoe" className="rounded-xl w-full" />
      <figcaption className="text-center text-sm text-muted-foreground mt-3">
        Dental screening and oral health care services at the outreach
      </figcaption>
    </figure>

    <h3>6. ENT (Ear, Nose &amp; Throat) Care</h3>
    <ul>
      <li><strong>Participants examined:</strong> 198</li>
      <li><strong>Referred for further care:</strong> 27 (14%)</li>
      <li><strong>Impact:</strong> Early management of ENT conditions reduced risk of complications</li>
    </ul>

    <h3>7. Menstrual Hygiene Education &amp; Support</h3>
    <ul>
      <li><strong>Adolescents reached:</strong> 74</li>
      <li><strong>Products distributed:</strong> 200+ (pads, menstrual cups, etc.)</li>
      <li><strong>Impact:</strong> Promoted menstrual health awareness and dignity among adolescent girls. Encouraged responsible sexual behavior and STI prevention</li>
    </ul>

    <figure className="my-8">
      <img src={podoeEducation} alt="Health education session at Podoe" className="rounded-xl w-full" />
      <figcaption className="text-center text-sm text-muted-foreground mt-3">
        Health education and menstrual hygiene session with adolescents
      </figcaption>
    </figure>

    <h3>8. Counseling &amp; Mental Health Support</h3>
    <ul>
      <li><strong>Participants counseled:</strong> 92</li>
      <li><strong>Impact:</strong> Addressed stress, anxiety, and emotional well-being, improving mental health awareness</li>
    </ul>

    <h3>9. Laboratory Testing</h3>
    <p><strong>Malaria Testing:</strong></p>
    <ul>
      <li><strong>Participants tested:</strong> 514</li>
      <li><strong>Positive cases:</strong> 48 (9.3%)</li>
      <li><strong>Impact:</strong> Immediate treatment reduced risk of severe illness</li>
    </ul>

    <p><strong>Hepatitis B &amp; C Testing:</strong></p>
    <ul>
      <li><strong>Participants tested:</strong> 514</li>
      <li><strong>Impact:</strong> Counseling, referrals, and education provided for long-term management</li>
    </ul>

    <figure className="my-8">
      <img src={podoeLab} alt="Laboratory testing at Podoe outreach" className="rounded-xl w-full" />
      <figcaption className="text-center text-sm text-muted-foreground mt-3">
        Laboratory testing and diagnostics during the community outreach
      </figcaption>
    </figure>

    <h3>10. Pharmacy Department</h3>
    <ul>
      <li><strong>Services provided:</strong> Dispensing of prescribed medications, patient counseling on drug use, dosage, and adherence</li>
      <li><strong>Medications dispensed for:</strong> Malaria, infections, pain management, hypertension, and other identified conditions</li>
      <li><strong>Impact:</strong> Ensured continuity of care by providing immediate access to essential medications and proper usage guidance</li>
    </ul>

    <h2>Community Engagement &amp; Response</h2>

    <figure className="my-8">
      <img src={podoeCommunity} alt="Community engagement at Podoe" className="rounded-xl w-full" />
      <figcaption className="text-center text-sm text-muted-foreground mt-3">
        Strong community participation and engagement during the outreach
      </figcaption>
    </figure>

    <p>
      The outreach recorded strong participation and community appreciation, with many beneficiaries
      accessing healthcare services for the first time. Social media coverage amplified its impact,
      showcasing:
    </p>
    <ul>
      <li>Real-time service delivery</li>
      <li>Health education moments</li>
      <li>Community testimonials</li>
    </ul>

    <p>The initiative reinforced the importance of preventive healthcare and early intervention.</p>

    <h2>The Way Forward</h2>

    <p>To sustain impact, stakeholders recommend:</p>
    <ul>
      <li>Regular outreach programs in underserved communities</li>
      <li>Strengthened referral systems for follow-up care</li>
      <li>Increased investment in preventive and primary healthcare</li>
      <li>Expanded public health education campaigns</li>
    </ul>

    <p>
      Viva Health Medical Foundation remains committed to bridging healthcare gaps and improving
      health outcomes across vulnerable communities.
    </p>
  </>
);
