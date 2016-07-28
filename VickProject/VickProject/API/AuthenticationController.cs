using System.Linq;
using System.Web.Http;
using VickProject.Models;

namespace VickProject.API
{
    public class AuthenticationController : ApiController
    {
        public IHttpActionResult Logon(User clientUser)
        {
            using (var context = new DAL.VickProjectContext())
            {
                var dbUser = context.User.FirstOrDefault(u => u.EmailAddress == clientUser.EmailAddress);
                if (dbUser == null) return NotFound();
                if (dbUser.Password != Utils.Encryptor.MD5Hash(clientUser.Password)) return BadRequest("Auth Failure");

                return Ok();
                
            }
        }

    }
}
