

const FollowUsSection = () => {
    const followUsLinks = [
        { platform: 'Facebook', url: 'https://www.facebook.com' },
        { platform: 'Twitter', url: 'https://www.twitter.com' },
        { platform: 'Instagram', url: 'https://www.instagram.com' },
        { platform: 'LinkedIn', url: 'https://www.linkedin.com' },
      ];
    
      const bannerStyle = {
        backgroundColor: '#333',
        padding: '20px',
        textAlign: 'center',
      };
    
      const headerStyle = {
        fontSize: '24px',
        color: '#fff',
        marginBottom: '10px',
      };
    
      const listStyle = {
        listStyle: 'none',
        padding: '0',
        margin: '0',
      };
    
      const listItemStyle = {
        display: 'inline-block',
        margin: '0 10px',
      };
    
      const linkStyle = {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '18px',
      };
    
      return (
        <div style={bannerStyle}>
          <h3 style={headerStyle}>Follow Us</h3>
          <ul style={listStyle}>
            {followUsLinks.map((link, index) => (
              <li key={index} style={listItemStyle}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  {link.platform}
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
    };

export default FollowUsSection;
