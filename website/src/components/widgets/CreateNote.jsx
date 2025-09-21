import { Input } from "@/components/ui/8bit/input";
import { Textarea } from "@/components/ui/8bit/textarea";
import { Button } from "@/components/ui/8bit/button";
import { Card, CardContent, CardFooter } from "@/components/ui/8bit/card";

export default function CreateNote({
  title,
  setTitle,
  content,
  setContent,
  editingId,
  resetForm,
  handleAddOrUpdate,
  onClose,
}) {
  const handleSubmit = (e) => {
    const res = handleAddOrUpdate(e);
    if (res && typeof onClose === "function") onClose();
    return res;
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-2">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="min-w-0 w-full break-words whitespace-normal"
          />
          <Textarea
            placeholder="Write something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="min-w-0 w-full break-words whitespace-normal"
          />
          <CardFooter className="flex items-center justify-between gap-4 mt-6">
            {editingId ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    if (typeof onClose === "function") onClose();
                  }}
                  className="cursor-pointer w-1/2"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  className="cursor-pointer w-1/2"
                >
                  Update
                </Button>
              </>
            ) : (
              <Button
                type="submit"
                variant="default"
                className="cursor-pointer w-full"
              >
                Add Note
              </Button>
            )}
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
