import safeSchoolFlyer from "@/assets/blog/safe-school-flyer.jpg";
import safeSchoolStudents from "@/assets/blog/safe-school-students.jpg";
import safeSchoolSession from "@/assets/blog/safe-school-session.jpg";

export const SafeSchoolArticle = () => (
  <>
    <p className="text-xl font-medium text-foreground italic">
      The Safe School Project — Addressing Bullying and Cyberbullying in Ghana's Schools
    </p>

    <p>
      Cyberbullying in Ghana is a growing issue, especially with increased use of social media, mobile
      money, and digital apps. A recent study by UNICEF in partnership with the Ministry of
      Communications found that <strong>40% of young people in Ghana</strong> have interacted online
      with individuals they had never met in person.
    </p>

    <p>
      On 18th and 19th March 2026, Viva Health Medical Foundation successfully conducted impactful
      visits to two schools—<strong>Virgo Preparatory School</strong> and{" "}
      <strong>Additrom Basic School, Lower Adabraka</strong>—as part of its expanding Safe School
      Project, an initiative aimed at addressing bullying and cyberbullying among young people.
    </p>

    <figure className="my-8">
      <img src={safeSchoolFlyer} alt="Safe School Project flyer" className="rounded-xl w-full" />
      <figcaption className="text-center text-sm text-muted-foreground mt-3">
        The Safe School Project campaign by Viva Health Medical Foundation
      </figcaption>
    </figure>

    <p>
      These engagements brought together students, educators, and mental health professionals in a
      shared space to address an issue that continues to affect the well-being and academic
      performance of many young people across the country.
    </p>

    <h2>Creating Awareness Where It Matters Most</h2>

    <p>
      Across both schools, the sessions were designed to go beyond lectures. They created safe and
      interactive environments where students could openly discuss their experiences, ask questions,
      and reflect on their roles within their school communities.
    </p>

    <p>Led by experienced psychologists, the discussions explored:</p>
    <ul>
      <li>What bullying and cyberbullying truly mean</li>
      <li>The different forms they can take</li>
      <li>Their emotional and psychological impact</li>
      <li>The importance of speaking up and seeking help</li>
    </ul>

    <p>
      For many students, this was the first time they had the opportunity to engage in such honest
      conversations on the subject.
    </p>

    <h2>Voices That Needed to Be Heard</h2>

    <p>
      One of the most powerful aspects of the outreach was the level of student participation and
      openness. Students shared personal experiences, raised concerns, and asked thought-provoking
      questions. It became evident that while some had witnessed bullying, others had experienced it
      directly—often in silence.
    </p>

    <figure className="my-8">
      <img src={safeSchoolStudents} alt="Students participating in anti-bullying session" className="rounded-xl w-full" />
      <figcaption className="text-center text-sm text-muted-foreground mt-3">
        Students actively participating in the Safe School Project sessions
      </figcaption>
    </figure>

    <p>The sessions helped to:</p>
    <ul>
      <li>Break the culture of silence around bullying</li>
      <li>Reassure students that they are not alone</li>
      <li>Encourage empathy among peers</li>
    </ul>

    <h2>Understanding the Hidden Impact</h2>

    <p>
      Through professional guidance, students were introduced to the psychological effects of
      bullying, including anxiety, low self-esteem, withdrawal, and academic decline. Special
      attention was given to cyberbullying, highlighting how digital platforms can amplify harm and
      make it harder for victims to escape or seek support.
    </p>

    <blockquote className="border-l-4 border-primary pl-4 italic my-6">
      "Bullying is not just a phase—it has real and lasting consequences on a child's mental health
      and development."
    </blockquote>

    <figure className="my-8">
      <img src={safeSchoolSession} alt="Psychologist-led session at school" className="rounded-xl w-full" />
      <figcaption className="text-center text-sm text-muted-foreground mt-3">
        Psychologist-led interactive session on the effects of bullying
      </figcaption>
    </figure>

    <h2>A Shared Responsibility</h2>

    <p>
      The Safe School Project reinforced an important message: creating safe school environments is a
      collective responsibility. Students were encouraged to:
    </p>
    <ul>
      <li>Speak up when they experience or witness bullying</li>
      <li>Support peers who may be struggling</li>
      <li>Use digital platforms responsibly</li>
    </ul>

    <p>Teachers and school authorities were also engaged on the importance of:</p>
    <ul>
      <li>Early detection of warning signs</li>
      <li>Providing safe reporting channels</li>
      <li>Fostering inclusive and supportive school cultures</li>
    </ul>

    <h2>Looking Ahead</h2>

    <p>
      The visits mark an important step in Viva Health's commitment to promoting mental well-being in
      schools across Ghana. However, this is only the beginning. Sustained efforts—including follow-up
      visits, continuous education, and the establishment of support systems—are essential to ensuring
      lasting impact.
    </p>

    <h2>Our Commitment</h2>

    <p>
      At Viva Health Medical Foundation, we believe that every child deserves to learn in a safe,
      supportive, and empowering environment. Through the Safe School Project, we remain committed to:
    </p>
    <ul>
      <li>Raising awareness</li>
      <li>Driving behavioral change</li>
      <li>Supporting schools in protecting their students</li>
    </ul>

    <p className="text-lg font-semibold text-foreground">
      Because safe schools are not just ideal—they are necessary.
    </p>

    <div className="bg-secondary/50 rounded-xl p-6 mt-8">
      <h3 className="text-lg font-bold text-foreground mb-2">📢 Join Us</h3>
      <p>
        If you would like to partner with us, support this initiative, or bring the Safe School
        Project to your school, we welcome you to connect with us. Together, we can build a future
        where every child feels seen, heard, and safe.
      </p>
    </div>
  </>
);
