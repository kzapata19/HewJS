const Team = () => {
  return (
    <div className="row" id="team-section">
      <div className="col-md-12 text-center team-header">TEAM</div>
      <div className="team-container text-center">
        <div className="member col-md-3">
          <a href="https://github.com/jtlong3rd"><img className="profile" src="https://avatars1.githubusercontent.com/u/15959217?v=3&s=460"></img></a>
          <h4 className="profile-name"><a href="https://github.com/jtlong3rd">Jamie Long</a></h4>
          <h3 className="title">Product Owner & Lead Engineer</h3>
        </div>
        <div className="member col-md-3">
          <a href="https://github.com/kzapata19"><img className="profile" src="https://avatars3.githubusercontent.com/u/10336681?v=3&s=400"></img></a>
          <h4 className="profile-name"><a href="https://github.com/kzapata19">Karen Zapata</a></h4>
          <h3 className="title">SCRUM Master & Lead Engineer</h3>
        </div>
        <div className="member col-md-3">
          <a href="https://github.com/peranatd"><img className="profile" src="https://avatars2.githubusercontent.com/u/18367600?v=3&s=400"></img></a>
          <h4 className="profile-name"><a href="https://github.com/peranatd">Peranat Dayananda</a></h4>
          <h3 className="title">Lead Engineer</h3>
        </div>
        <div className="member col-md-3">
          <a href="https://github.com/Ronolibert"><img className="profile" src="https://avatars0.githubusercontent.com/u/13622298?v=3&s=460"></img></a>
          <h4 className="profile-name"><a href="https://github.com/Ronolibert">Ron Cruz</a></h4>
          <h3 className="title">Lead Engineer</h3>
        </div>
      </div>
    </div>
  );
};

module.exports = Team;
