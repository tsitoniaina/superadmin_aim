import '../App.css';
import '../index.css';

export default function UserDataView({ userData }) {
  console.log(userData.data.planets);
  return (
    <div className="user-data-table">
      <table>
        <tbody>
          <tr>
            <td>First Name</td>
            <td>{userData.data.first_name}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>{userData.data.last_name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{userData.data.email}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{userData.data.phone}</td>
          </tr>
          <tr>
            <td>Last Signed In</td>
            <td>{userData.data.last_sign_in_at}</td>
          </tr>
          <tr>
            <td>Planets</td>
            <td>
              {userData.data.planets.map((planet, index) => (
                <a
                  key={index}
                  href={planet.status ? planet.link : '#'} // Disable link if status is false
                  className={`btn me-2 mb-2 ${planet.status ? 'btn-success' : 'btn-danger'}`} // Apply different classes based on status
                  style={{ borderRadius: '5px' }}
                  disabled={!planet.status} // Disable button if status is false
                >
                  {planet.name}
                </a>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
