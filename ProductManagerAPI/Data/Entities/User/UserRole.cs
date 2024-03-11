using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductManagerAPI.Data.Entities
{
    public class UserRole
    {
        [ForeignKey("UserId")]
        [Key]
        public required int UserId { get; set; }
        [ForeignKey("RoleId")]
        [Key]
        public required int RoleId { get; set; }

        public required User User { get; set; }
        public required Role Role { get; set; }
    }
}
