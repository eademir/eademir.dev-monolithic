<script lang="ts">
    import CustomInput from '$lib/components/input/CustomInput.svelte';
    import CustomButton from '$lib/components/button/CustomButton.svelte';
    interface Project {
        name: string;
        description: string;
        links: string;
        image: string;
        techs: string;
        skills: string;
        date: number;
    }

    interface TechSubsection {
        name: string;
    }

    interface Tech {
        name: string;
        subsection: string;
    }

    let tech: Tech = {} as Tech;

    let project: Project = {} as Project;

    let techSubsection: TechSubsection = {} as TechSubsection;

    let projects: Project[] = [];
    let techs: Tech[] = [];
    let techClasses: TechSubsection[] = [];

    const addTech = async () => {
        const path = `skills/${tech.subsection}/techs`;
        try {
            const docRef = await addDoc(collection(firestoreDB, path), tech);
            console.log('Document written with ID: ', docRef.id);
            alert('Tech added successfully');
        } catch (e) {
            console.error('Error adding document: ', e);
        }
        tech = {} as Tech;
    };

    const addTechClasses = async () => {
        const path = `techSubsections`;
        try {
            alert('Tech added successfully');
        } catch (e) {
            console.error('Error adding document: ', e);
        }
        techSubsection = {} as TechSubsection;
    };

    const addProject = async () => {
        const path = `projects`;
        try {
            alert('Project added successfully');
        } catch (e) {
            console.error('Error adding document: ', e);
        }
        project = {} as Project;
    };
</script>

<div class="flex h-screen flex-col pt-10 md:flex-row md:p-14">
    <div class="h-full w-full p-4"></div>
</div>
