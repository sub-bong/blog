import "./about.css";

export default function About() {
  return (
    <div className="about-contents">
      <div className="about-item">
        <img src="/public/img/meerkat_doing.gif" title="something doing..." />
      </div>
      <div className="about-item">
        <h2>My Stack</h2>
      </div>
      <div className="about-item">
        <div className="about-item-content">
          <span className="stack-tag">stack</span>javascript
        </div>
        <div className="about-item-content">
          <span className="stack-tag">stack</span>typescript
        </div>
        <div className="about-item-content">
          <span className="stack-tag">stack</span>node.js
        </div>
        <div className="about-item-content">
          <span className="stack-tag">stack</span>react.js
        </div>
        <div className="about-item-content">
          <span className="stack-tag">stack</span>nest.js
        </div>
        <div className="about-item-content">
          <span className="stack-tag">stack</span>python
        </div>
        <div className="about-item-content">
          <span className="domain-tag">domain</span>Psychology
        </div>
        <div className="about-item-content">
          <span className="domain-tag">domain</span>Neuropsychology
        </div>
      </div>
    </div>
  );
}
