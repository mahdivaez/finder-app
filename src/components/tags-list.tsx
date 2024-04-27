import { Badge } from "@/components/ui/badge"

export function splitTags(tags: string | null) {
  if (tags === null) {
    return [];
  }
  return tags.split(",").map(tag => tag.trim());
}


export function TagsList({tags}:{tags:string[]}){


    return(
        <div className="flex gap-3 flex-wrap">

            {tags.map(tag => (
              <Badge className="w-fit " key={tag}>{tag}</Badge>
            ))}</div>
    )
}