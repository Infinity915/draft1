import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./TopicDetails.css";

const TopicDetails = () => {
  const { levelId, topicId } = useParams();
  const [topic, setTopic] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:2100/api/levels/${levelId}/topics/${topicId}`);
        console.log('Topic data:', res.data);
        setTopic(res.data);
      } catch (err) {
        console.error("Error fetching topic:", err);
        setError("Could not load topic details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [levelId, topicId]);

  if (loading) return <div className="loading">Loading topic...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!topic) return <div className="error">Topic not found</div>;

  // Function to convert newlines to JSX breaks
  const formatContent = (text) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div className="topic-details-container">
      <div className="topic-header">
        <div className="series-title">{topic.seriesTitle}</div>
        <h1>{topic.levels?.[0]?.topics?.[0]?.title}</h1>
        <Link to={`/topics/level-${levelId}`} className="back-link">
          ← Back to Topics
        </Link>
      </div>

      <div className="topic-content">
        <div className="topic-summary">
          <h3>Summary</h3>
          <p>{topic.levels?.[0]?.topics?.[0]?.summary}</p>
        </div>

        {topic.levels?.[0]?.topics?.[0]?.image && (
          <div className="topic-image">
            <img src={topic.levels[0].topics[0].image} alt={topic.levels[0].topics[0].title} />
          </div>
        )}

        <div className="topic-main-content">
          {formatContent(topic.levels?.[0]?.topics?.[0]?.content || '')}
        </div>

        {topic.levels?.[0]?.topics?.[0]?.additionalImages?.length > 0 && (
          <div className="additional-images">
            <h3>Additional Resources</h3>
            <div className="image-grid">
              {topic.levels[0].topics[0].additionalImages.map((img, idx) => (
                <img key={idx} src={img} alt={`Additional resource ${idx + 1}`} />
              ))}
            </div>
          </div>
        )}

        {topic.levels?.[0]?.topics?.[0]?.videoLinks?.length > 0 && (
          <div className="video-section">
            <h3>Video Resources</h3>
            <div className="video-grid">
              {topic.levels[0].topics[0].videoLinks.map((video, idx) => (
                <div key={idx} className="video-container">
                  <a href={video} target="_blank" rel="noopener noreferrer">
                    Video {idx + 1}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {topic.levels?.[0]?.topics?.[0]?.quiz && (
          <div className="topic-quiz">
            <h2>Knowledge Check</h2>
            {topic.levels[0].topics[0].quiz.map((q, idx) => (
              <div key={idx} className="quiz-question">
                <h4>Question {idx + 1}</h4>
                <p>{q.question}</p>
                <div className="quiz-options">
                  {q.options.map((opt, i) => (
                    <label key={i} className="quiz-option">
                      <input 
                        type="radio" 
                        name={`question-${idx}`} 
                        value={i} 
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicDetails;
