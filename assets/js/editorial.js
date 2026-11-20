(function(){
var $=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
/* nav + smooth scroll */
var nav=document.getElementById('ed-nav'),bg=document.getElementById('ed-burger');
function closeNav(){if(nav){nav.classList.remove('open');bg&&bg.setAttribute('aria-expanded','false')}}
if(bg)bg.addEventListener('click',function(){var o=nav.classList.toggle('open');bg.setAttribute('aria-expanded',o)});
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;
 var id=a.getAttribute('href').slice(1);var t=id&&document.getElementById(id);if(!t)return;
 e.preventDefault();e.stopPropagation();closeNav();
 var h=document.getElementById('sticky-header');var y=t.getBoundingClientRect().top+window.pageYOffset-(h?h.offsetHeight:0)-8;
 window.scrollTo({top:y,behavior:reduce?'auto':'smooth'});if(history.replaceState)history.replaceState(null,'','#'+id)},true);
/* dropdowns */
$('.has-sub').forEach(function(li){var b=li.querySelector('.sub-btn');
 b.addEventListener('click',function(e){e.stopPropagation();var o=!li.classList.contains('open');$('.has-sub').forEach(function(x){x.classList.remove('open');x.querySelector('.sub-btn').setAttribute('aria-expanded','false')});if(o){li.classList.add('open');b.setAttribute('aria-expanded','true')}})});
document.addEventListener('click',function(){$('.has-sub').forEach(function(x){x.classList.remove('open');x.querySelector('.sub-btn').setAttribute('aria-expanded','false')})});
document.addEventListener('keydown',function(e){if(e.key==='Escape')$('.has-sub').forEach(function(x){x.classList.remove('open')})});
/* active section */
var links=$('.ed-nav a'),targets=links.map(function(a){return document.getElementById(a.getAttribute('href').slice(1))});
function spy(){var y=window.pageYOffset+140,cur=0;targets.forEach(function(t,i){if(t&&t.getBoundingClientRect().top+window.pageYOffset<=y)cur=i});
 if(window.innerHeight+window.pageYOffset>=document.body.scrollHeight-4)cur=links.length-1;
 $('.sub-btn').forEach(function(b){b.classList.toggle('active',!!(links[cur]&&b.parentNode.contains(links[cur])))});
 links.forEach(function(a,i){a.classList.toggle('active',i===cur);i===cur?a.setAttribute('aria-current','true'):a.removeAttribute('aria-current')})}
window.addEventListener('scroll',spy,{passive:true});window.addEventListener('load',spy);spy();
/* flip cards */
$('.flip-card').forEach(function(c){function t(){var f=c.classList.toggle('flipped');c.setAttribute('aria-pressed',f)}
 c.addEventListener('click',t);c.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();t()}})});
/* project filter */
var items=$('.ed-grid .grid-item');
$('.menu-filtering li').forEach(function(li){li.setAttribute('tabindex','0');function go(){var f=li.getAttribute('data-filter');
 $('.menu-filtering li').forEach(function(x){x.classList.remove('current_menu_item')});li.classList.add('current_menu_item');
 items.forEach(function(it){it.classList.toggle('is-hidden',f!=='*'&&!it.matches(f))})}
 li.addEventListener('click',go);li.addEventListener('keydown',function(e){if(e.key==='Enter'){go()}})});
/* journal */
var P={1:["My journey into technology has been a continuous process of curiosity, discovery and personal growth.","Through the ¡Supérate! program, I began exploring the world of Information Technology and discovered how digital tools can become powerful resources for creativity and problem-solving.","Over time, I became interested in programming, digital design and the possibilities of creating things through technology. I started exploring tools such as Visual Studio Code and GitHub, while developing my understanding of programming fundamentals.","One of the most meaningful parts of this journey has been learning how technology connects with other areas I enjoy, especially communication, business and creativity.","I know there is still so much to learn, and that is precisely what makes this journey exciting. Every new skill represents another opportunity to grow and transform ideas into something meaningful."],
2:["Some of my most meaningful lessons have happened outside the classroom.","I have always considered myself a shy person, especially when it comes to speaking in front of others or approaching unfamiliar situations. However, throughout my academic journey, I have gradually learned to challenge that insecurity.","Participating in English presentations, public speaking activities, debates, group projects and leadership experiences has helped me become more confident.","My experiences at ¡Supérate! and my professional internship have also taught me how important communication, adaptability and teamwork are.","I have learned that confidence is not something that appears overnight. It develops through experience, small challenges and the willingness to keep trying.","Today, I appreciate every opportunity that pushes me beyond my comfort zone because each one teaches me something new about myself."],
3:["English has become one of the most important ways I express myself.","I have taken the TOEIC Listening & Reading test (score 905, CEFR B2) and the TOEIC Speaking & Writing test, and I have taken part in English public speaking activities.","I also won first place in my class in the English Week dictation contest.","Each of these experiences has helped me build confidence and clarity when presenting my ideas."],
4:["Creativity has always been one of the ways I explore and understand the world around me.","I enjoy discovering new ideas through art, museums, exhibitions and cultural experiences. Visiting creative spaces allows me to appreciate different perspectives, stories and forms of expression.","I am also interested in photography, digital design, visual storytelling and creative projects. I enjoy experimenting with colors, layouts, aesthetics and different ways of presenting ideas.","Some of my favorite hobbies involve activities that combine creativity and patience, such as miniature projects, decorative crafts, journaling and exploring new visual inspirations.","For me, creativity is not limited to producing something beautiful. It is also about observing, experimenting, learning and finding inspiration in everyday experiences.","I believe there is always something worth discovering when we allow ourselves to look at the world creatively."],
5:["As part of my professional internship, I had the opportunity to work in the administrative and accounting department at American International School, from October 5 to November 20, 2026.","Throughout this experience, I developed practical skills in document management, filing, organization and accounting procedures. I also gained exposure to tools such as Sage 50 and learned about the importance of accuracy, responsibility and teamwork in a professional environment.","Beyond the technical knowledge, this experience allowed me to strengthen my communication skills, adapt to new challenges and learn from supportive and experienced colleagues.","This internship was an important step in my professional growth, helping me connect my academic knowledge with real-world experience."],
6:["2026 has been a year of new experiences and challenges.","I led the Finance & Accounting department for ExpoTech 2026 with our HealthBoost project, completed my professional internship at American International School and continued building my certifications, including TOEIC, Python with Cisco Networking Academy and Microsoft Excel Expert.","I am also preparing to graduate from Colegio Ingeniero Tomás Guardia and looking ahead to exploring higher education in Communication and Digital Marketing.","Every step this year has taught me something new, and I am grateful for each one."]};
var M=document.createElement('div');M.className='ed-modal';M.setAttribute('role','dialog');M.setAttribute('aria-modal','true');M.setAttribute('aria-labelledby','ed-t');
M.innerHTML='<div class="ed-sheet"><img alt=""><div class="ed-body"><span class="ed-cat"></span><h2 id="ed-t"></h2><div class="ed-text"></div><button type="button" class="ed-back">Back to Journal</button></div></div>';
document.body.appendChild(M);var last=null;
function open(card){var n=card.getAttribute('data-entry'),im=card.querySelector('.blog-thumb img');last=card;
 M.querySelector('img').src=im.src;M.querySelector('img').alt=im.alt;M.querySelector('.ed-cat').textContent=card.querySelector('.meta-blog-date').textContent;
 M.querySelector('h2').textContent=card.querySelector('.blog-title a').textContent;
 M.querySelector('.ed-text').innerHTML=P[n].map(function(p){return '<p></p>'}).join('');
 $('p',M).forEach(function(p,i){p.textContent=P[n][i]});M.classList.add('open');document.body.style.overflow='hidden';M.scrollTop=0;M.querySelector('.ed-back').focus()}
function close(){M.classList.remove('open');document.body.style.overflow='';if(last)last.focus()}
$('.single-blgo-box').forEach(function(c){c.addEventListener('click',function(e){e.preventDefault();open(c)});c.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open(c)}})});
M.querySelector('.ed-back').addEventListener('click',close);M.addEventListener('click',function(e){if(e.target===M)close()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&M.classList.contains('open'))close()});
})();
