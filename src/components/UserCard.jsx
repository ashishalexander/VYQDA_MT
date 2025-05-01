const UserCard = ({ user }) => {
    return (
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <div className="d-flex align-items-center mb-3">
            <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-3" 
                 style={{ width: '48px', height: '48px', fontSize: '1.2rem' }}>
              {user.name.charAt(0)}
            </div>
            <h5 className="card-title mb-0">{user.name}</h5>
          </div>
          
          <div className="card-text">
            <p className="mb-1">
              <i className="bi bi-envelope me-2"></i>
              <a href={`mailto:${user.email}`} className="text-decoration-none">{user.email}</a>
            </p>
            <p className="mb-1">
              <i className="bi bi-telephone me-2"></i>
              <a href={`tel:${user.phone}`} className="text-decoration-none">{user.phone}</a>
            </p>
            <p className="mb-1">
              <i className="bi bi-building me-2"></i>
              {user.company.name}
            </p>
            <p className="mb-0">
              <i className="bi bi-geo-alt me-2"></i>
              {user.address.city}
            </p>
          </div>
        </div>
        <div className="card-footer bg-white border-top-0">
          <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">
            Website
          </a>
        </div>
      </div>
    );
  };
  
  export default UserCard;